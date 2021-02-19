const Queue = require('bull');
const path = require('path');

const {redisPort} = require('../../../../../config');
const queueOptions = {
  redis: {port: redisPort, host: '127.0.0.1'},
}
const dbQueue = new Queue('database', queueOptions);

dbQueue.process(2, path.resolve(path.join(__dirname, './processor.js')))

module.exports = dbQueue;