const path = require('path');
const {logger} = require('../log');

const scanQueue = require('./queue');

class Scanner {
  constructor(folderPath)
  {
    /**
     * make new process and add {targetFolder, pid} to scanQueue
     */
    this.root = path.resolve(folderPath);
  }

  scan(){
    
  }
}

module.exports = Scanner;