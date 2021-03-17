const path = require('path');
const fs = require('fs');

const logger = require('../../../log').loggerWrapper(module);

const {pluginDirectory} = require('../../../../config');

const pluginScannerDirectory = path.join(pluginDirectory, 'scanner');

let scannersPath = {};
let scanners = {};

function loadScanner(){
  try
  {
    const pluginDirectories = fs.readdirSync(pluginScannerDirectory, { withFileTypes: true }).filter(file => file.isDirectory())
    
    for(let i=0; i<pluginDirectories.length; i++)
    {
      const pluginDirectory = pluginDirectories[i];
      const pluginPath = path.join(pluginScannerDirectory, pluginDirectory.name);
      scannersPath[pluginDirectory.name] = pluginPath;
      try
      {
        scanners[pluginDirectory.name] = require(pluginPath);
        logger.info('scanner plugin added: ' + pluginDirectory.name + ' [' + pluginPath + ']');
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

function reloadScanner(){
  for(const module in scannersPath)
  {
    delete require.cache[scannersPath[module] + '/index.js'];
  }

  scanners = {};
  scannersPath = {};
  return loadScanner();
}



module.exports = {
  loadScanner,
  reloadScanner,
  scanners,
  scannersPath,
}