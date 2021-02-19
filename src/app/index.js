const path = require('path');

const {logger} = require('./log');
const {webHost, webPort} = require('../../config');

const expressApp = require('../www');
const processor = require('./taskQueue');


require('./redis');

class App{
  constructor(){
    this.run(webHost, webPort)
  }

  run(host, port){
    expressApp.listen(port, host, ()=>{
      logger.info(`Server listening on ${host}:${port}`, {filename: __filename});
    });

  }

  scan(folderPath){
    this.scanQueue = processor.scanQueue;
    this.scanQueue.add({path: path.resolve(__dirname, folderPath), scanner: 'default'});
  }
}

const app = new App();
app.scan('../../books');

