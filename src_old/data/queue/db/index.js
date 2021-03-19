const Queue = require('bull');
const path = require('path');

const {redisPort} = require('../../../../../config');
const queueOptions = {
  redis: {port: redisPort, host: '127.0.0.1'},
}

/**
 * @param {string} query
 * query: string
 * sql command
 * 
 * data: object|object[]|undefined
 * 
 */
const dbQueue = new Queue('database', queueOptions);

dbQueue.process(4, path.resolve(path.join(__dirname, './processor.js')))


/**
 * @brief 
 * insertQuery: insert query for scanned single data.
 * data = {
 *  path
 *  type
 * }
 * 
 * @param {object[]} data 
 * @return {void}
 */
function insertScannerResult(data)
{
  const insertQuery = `INSERT OR REPLACE
  INTO library (id, path, type, created_at, updated_at) 
  VALUES (
    (SELECT id FROM library WHERE path=@path),
    @path, 
    @type,
    (SELECT created_at FROM library WHERE path=@path),
    (SELECT datetime('now', 'localtime'))
    );`;

  dbQueue.add({query: insertQuery, data: data});
}

module.exports = {
  dbQueue,
  insertScannerResult,
}