const path = require('path');
const fs = require('fs');

const {logger} = require('../../../log');

const {scanners} = require('../../../plugins/scanner');

/**
 * new Scanner(validDirectoryPath, validScannerName)
 */
class Scanner {
  constructor(folderPath, scannerName)
  {
    if(fs.existsSync(path.resolve(folderPath)) === false)
    {
      throw new Error('[' + path.resolve(folderPath) + '] does not exists!');
    }

    if(fs.statSync(path.resolve(folderPath)).isDirectory() === false)
    {
      throw new Error('[' + path.resolve(folderPath) + '] is not a directory!');
    }

    if(scanners[scannerName] === undefined)
    {
      throw new Error('[' + scannerName + '] scanner does not exist!')
    }

    this.root = path.resolve(folderPath);
    this.scan = scanners[scannerName];
    this.logger = logger;
    this.result = {};
    this.start = new Date().getTime();
    this.end = Infinity;
    
    this.scan.bind(this);
  }
}

module.exports = Scanner;