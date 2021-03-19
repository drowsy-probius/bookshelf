const path = require('path');
const WorkerQueue = require('../WorkerQueue');

function somework(job)
{
  console.log(job);
}

const databaseQueue = new WorkerQueue(somework, 1000, path.resolve(__dirname, 'database.json'));

module.exports = databaseQueue;
