const path = require('path');
const WorkerQueue = require('../WorkerQueue');
const {scanner} = require('../../processor');

const scannerQueue = new WorkerQueue(scanner, path.resolve(__dirname, 'scanner.json'));

module.exports = scannerQueue;
