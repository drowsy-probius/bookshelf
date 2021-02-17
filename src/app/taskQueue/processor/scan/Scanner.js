const path = require('path');

const {logger} = require('../../../log');

const {scanners} = require('../../../plugins/scanner');

class Scanner {
  constructor(folderPath, scannerName)
  {
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