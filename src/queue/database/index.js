const path = require('path');
const WorkerQueue = require('../WorkerQueue');
const {database} = require('../../worker');

const databaseQueue = new WorkerQueue(database, path.resolve(__dirname, 'database.json'));

module.exports = databaseQueue;
