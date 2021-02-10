import path from 'path';
import logger from '../log';

import scanQueue from './queue'

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

export default Scanner;