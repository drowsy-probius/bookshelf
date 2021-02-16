const path = require('path');

const {logger} = require('./log');
const {webHost, webPort} = require('./config');

const Database = require('./controller/database');
const database = new Database();

const Scanner = require('./scanner/Scanner');
const Watcher = require('./scanner/Watcher');

const expressApp = require('../www');

require('./redis');

class App{
  constructor(){
    this.run(webHost, webPort)
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