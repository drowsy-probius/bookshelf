const databaseQueue = require('./database');
const scannerQueue = require('./library/scanner');
const agentQueue = require('./library/agent');

module.exports = {
  databaseQueue,
  scannerQueue,
  agentQueue,
};
