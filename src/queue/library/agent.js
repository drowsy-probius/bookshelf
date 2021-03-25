const path = require('path');
const WorkerQueue = require('../WorkerQueue');
const {agent} = require('../../worker');

const agentQueue = new WorkerQueue(agent, path.resolve(__dirname, 'agent.json'));

module.exports = agentQueue;
