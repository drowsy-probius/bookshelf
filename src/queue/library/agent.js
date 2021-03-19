const path = require('path');
const WorkerQueue = require('../WorkerQueue');

function somework(job)
{
  console.log(job)
}

const agentQueue = new WorkerQueue(somework, 1000, path.resolve(__dirname, 'agent.json'));

module.exports = agentQueue;
