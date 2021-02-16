const path = require('path');

const {logger} = require('./log');

const Database = require('./controller/database');
const database = new Database();

const Scanner = require('./scanner/Scanner');
const Watcher = require('./scanner/Watcher');

const expressApp = require('../www');

require('./redis');

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

  }

  watch(folderPath){

  }
}

new App();