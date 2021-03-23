const fs = require('fs');
const {PluginScanners} = require('.');

class Scanner
{
  constructor(library, scannerName)
  {
    if(fs.existsSync(library) === false)
    {
      throw new Error(`[${library}] does not exists!`);
    }

    if(fs.statSync(library).isDirectory() === false)
    {
      throw new Error(`[${library}] is not a directory!`);
    }

    if(PluginScanners.plugins[scannerName] === undefined)
    {
      throw new Error(`[${scannerName}] plugin does not exists!`);
    }

    this.root = library;
    this.work = PluginScanners.plugins[scannerName];
    this.logger = require('../log').loggerWrapper({filename:`custom scanner: ${scannerName}`, notFilePath: true});
    this.result = [];
    this.start = new Date().getTime();
    this.end = Infinity;

    this.work.bind(this);
  }
}

module.exports = Scanner;
