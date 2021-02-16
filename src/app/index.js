const path = require('path');

const {loadScanner} = require('./plugins/scanner');

const {logger} = require('./log');
const {webHost, webPort} = require('../../config');

const Database = require('./db');
const database = new Database();

const expressApp = require('../www');

require('./redis');

class App{
  constructor(){
    loadScanner();
    this.run(webHost, webPort)
  }

  run(host, port){
    expressApp.listen(port, host, ()=>{
      logger.info(`Server listening on ${host}:${port}`);
    });

  }

  scan(folderPath){

  }
}

new App();