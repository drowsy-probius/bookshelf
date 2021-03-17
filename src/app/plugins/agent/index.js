const path = require('path');
const fs = require('fs');

const logger = require('../../../log').loggerWrapper(module);

const {pluginDirectory} = require('../../../../config');

const pluginAgnetDirectory = path.join(pluginDirectory, 'agent');

let agnetsPath = {};
let agnets = {};

function loadAgnet(){
  try
  {
    const pluginDirectories = fs.readdirSync(pluginAgnetDirectory, { withFileTypes: true }).filter(file => file.isDirectory())

    for(let i=0; i<pluginDirectories.length; i++)
    {
      const pluginDirectory = pluginDirectories[i];
      const pluginPath = path.join(pluginAgnetDirectory, pluginDirectory.name);
      agnetsPath[pluginDirectory.name] = pluginPath;
      try
      {
        agnets[pluginDirectory.name] = require(pluginPath);
        logger.info('agent plugin added: ' + pluginPath);
      }
      catch(e)
      {
        logger.error(e);
      }
    }
  }
  catch(e)
  {
    logger.error(e);
  }
}

function reloadAgnet(){
  for(const module in agnetsPath)
  {
    delete require.cache[agnetsPath[module] + '/index.js'];
  }

  agnets = {};
  agnetsPath = {};
  return loadAgnet();
}

module.exports = {
  loadAgnet,
  reloadAgnet,
  agnets,
  agnetsPath,  
}