const database = require('./database');
const agent = require('./library/agent');
const scanner = require('./library/scanner');
const PluginLoader = require('./PluginLoader');

const PluginAgents = new PluginLoader('agent');
const PluginScanners = new PluginLoader('scanner');

module.exports = {
  database,
  agent,
  scanner,
  PluginAgents,
  PluginScanners,
}
