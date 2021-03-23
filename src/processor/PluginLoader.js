const fs = require('fs');
const path = require('path');
const logger = require('../log').loggerWrapper(module);
const {pluginDirectory} = require('../../config');

/**
 * 'agent', 'scanner'
 */
class PluginLoader
{
  constructor(type)
  {
    this.type = type;
    this.directory = path.join(pluginDirectory, this.type);
    this.plugins = {};
    this.pluginsPath = {};
    this.load();
  }

  load()
  {
    try
    {
      const pluginDirectories = fs.readdirSync(this.directory, {withFileTypes: true}).filter(file => file.isDirectory());
      
      for(let i=0; i<pluginDirectories.length; i++)
      {
        const pluginDirectory = pluginDirectories[i];
        const pluginPath = path.join(this.directory, pluginDirectory.name);
        try
        {
          this.plugins[pluginDirectory.name] = require(pluginPath);
          this.pluginsPath[pluginDirectory.name] = pluginPath;
          logger.info(`Custom Plugin added: ${pluginPath}`);
        }
        catch(e)
        {
          logger.error(`${pluginPath} is not valid Plugin.`);
          logger.error(e);
        }
      }
    }
    catch(e)
    {
      logger.error(e);
    }
  }

  unload()
  {
    for(const module in this.pluginsPath)
    {
      delete require.cache[this.pluginsPath[module] + './index.js'];
    }
    this.plugins = {};
    this.pluginsPath = {};
  }

  reload()
  {
    this.unload();
    this.load();
  }
}

module.exports = PluginLoader;
