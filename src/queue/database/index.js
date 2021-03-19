const WorkerQueue = require('../WorkerQueue');

function somework(job)
{
  console.log(job);
}

const databaseQueue = new WorkerQueue(somework, 1000);

module.exports = databaseQueue;
