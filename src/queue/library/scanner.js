const path = require('path');
const WorkerQueue = require('../WorkerQueue');

function somework(job)
{
  console.log(job);
}

const scannerQueue = new WorkerQueue(somework, 1000, path.resolve(__dirname, 'scanner.json'));

module.exports = scannerQueue;
