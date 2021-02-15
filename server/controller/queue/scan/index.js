const Queue = require('bull');
const path = require('path');

const {REDIS_PORT} = require('../../../constants');
const REDIS_URL = 'redis://127.0.0.1:' + REDIS_PORT;

const scanQueue = new Queue('scan_library', REDIS_URL);

scanQueue.process(5, path.resolve(path.join(__dirname, './scanProcessor.js')))

module.exports = scanQueue;