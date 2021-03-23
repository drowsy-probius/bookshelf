const {PluginAgents} = require('.');

class Agent
{
  constructor(agentName)
  {
    if(PluginAgents.plugins[agentName] === undefined)
    {
      throw new Error(`[${agentName}] plugin does not exists!`);
    }

    this.work = PluginAgents.plugins[agentName];
    this.logger = require('../log').loggerWrapper({filename: `custom agent: ${agentName}`, notFilePath: true});
    this.result = [];
    this.start = new Date().getTime();
    this.end = Infinity;

    this.work.bind(this);
  }
}

module.exports = Agent;
