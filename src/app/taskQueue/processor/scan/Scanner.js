const fs = require('fs');

const {scanners} = require('../../../plugins/scanner');

/**
 * new Scanner(validAbsoluteDirectoryPath, validscanner)
 */
class Scanner {
  constructor(library, scannerName)
  {
    if(fs.existsSync(library) === false)
    {
      throw new Error('[' + library + '] does not exists!');
    }

    if(fs.statSync(library).isDirectory() === false)
    {
      throw new Error('[' + library + '] is not a directory!');
    }

    if(scanners[scannerName] === undefined)
    {
      throw new Error('[' + scannerName + '] scanner does not exist!')
    }

    this.root = library;
    this.scan = scanners[scannerName];
    this.logger = require('../../../../log').loggerWrapper({filename: 'custom scanner: ' + scannerName, notFilePath: true});
    this.result = [];
    this.start = new Date().getTime();
    this.end = Infinity;
    
    this.scan.bind(this);
  }
}

module.exports = Scanner;