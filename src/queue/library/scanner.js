const WorkerQueue = require('../WorkerQueue');

function somework(job)
{
  console.log(job);
}

const scannerQueue = new WorkerQueue(somework, 1000);

module.exports = scannerQueue;
