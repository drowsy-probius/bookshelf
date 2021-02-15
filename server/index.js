const path = require('path');
const child_process = require('child_process');

const {logger} = require('./log');

const Database = require('./controller/database');
const database = new Database();

const Scanner = require('./scanner/Scanner');
const Watcher = require('./scanner/Watcher');

const expressApp = require('./server');

require('./redis')

const scanQueue = require('./controller/queue/scan');
scanQueue.add({test: 1})
scanQueue.on('completed', (job, result) => {
  console.log(result);
})

class App{
  constructor(host='0.0.0.0', port=3456){
    this.run(host, port)
  }

  run(host, port){
    expressApp.listen(port, host, ()=>{
      logger.info(`Server listening on ${host}:${port}`);
    });

  }

  scan(folderPath){
    const scanWorker = child_process.fork(Scanner, folderPath);
    scanWorker.on('close', (code) => {
      logger.info('scan job exited with code: ' + code);
    });
  }

  watch(folderPath){
    const watchWorker = child_process.fork(Watcher, folderPath);
    watchWorker.on('close', (code) => {
      logger.info('watch job exited with code: ' + code)
    });
  }
}

new App();