const {logger} = require('../log');
const {bookshelf} = require('../db');
const scanQueue = require('./processor/scan');
const dbQueue = require('./processor/db');

const insertScanResult = bookshelf.prepare('INSERT INTO library (path, type) VALUES (@path, @type)');

scanQueue.on('error', (error) => {
  logger.error(error)
});

scanQueue.on('completed', (job, result) => {
  logger.info('scan job done: ')
  logger.info(job.data)

  for(let i=0; i<result.length; i++)
  {
    dbQueue.add({func: function(){insertScanResult.run(result[i]); console.log(result[i])}})
  }
});

dbQueue.on('error', (error) => {
  logger.error(error, {filename: __filename})
});

dbQueue.on('completed', (job, result) => {
  logger.info(job.data)
  logger.info(result);
})



module.exports = {
  scanQueue,
  dbQueue,
}