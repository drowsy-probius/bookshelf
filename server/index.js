import path from 'path';
import child_process from 'child_process';

import logger from './log';

import Database from './controller/database';
const database = new Database();

import Scanner from './scanner/Scanner';
import Watcher from './scanner/Watcher';

import expressApp from './server';

class App{
  constructor(host='0.0.0.0', port=3456){
    this.run(host, port)
  }

  run(host, port){
    expressApp.listen(port, host, ()=>{
      logger.log(`Server listening on ${host}:${port}`);
    });

  }

  scan(folderPath){
    const scanWorker = child_process.fork(Scanner, folderPath);
    scanWorker.on('close', (code) => {
      logger.log('scan job exited with code: ' + code);
    });
  }

  watch(folderPath){
    const watchWorker = child_process.fork(Watcher, folderPath);
    watchWorker.on('close', (code) => {
      logger.log('watch job exited with code: ' + code)
    });
  }
}

export default App;