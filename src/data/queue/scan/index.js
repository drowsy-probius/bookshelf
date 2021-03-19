const Queue = require('bull');
const path = require('path');

const {redisPort} = require('../../../../../config');
const queueOptions = {
  redis: {port: redisPort, host: '127.0.0.1'},
}

const scanQueue = new Queue('scanLibrary', queueOptions);

scanQueue.process(5, path.resolve(path.join(__dirname, './processor.js')))

module.exports = scanQueue;