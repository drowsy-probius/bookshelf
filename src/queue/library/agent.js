const WorkerQueue = require('../WorkerQueue');

function somework(job)
{
  console.log(job)
}

const agentQueue = new WorkerQueue(somework, 1000);

module.exports = agentQueue;
