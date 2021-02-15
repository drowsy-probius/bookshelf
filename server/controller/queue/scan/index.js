const Queue = require('bull');
const path = require('path');

const {redisPort} = require('../../../constants');
const queueOptions = {
  redis: {port: redisPort, host: '127.0.0.1'},
}

const scanQueue = new Queue('scanLibrary', queueOptions);

scanQueue.process(5, path.resolve(path.join(__dirname, './scanProcessor.js')))

module.exports = scanQueue;