const path = require('path');
const WorkerQueue = require('../WorkerQueue');
const {database} = require('../../processor/utils');

const databaseQueue = new WorkerQueue(database, path.resolve(__dirname, 'database.json'));

module.exports = databaseQueue;
