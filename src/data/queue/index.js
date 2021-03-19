const logger = require('../../log').loggerWrapper(module);

const scanQueue = require('./processor/scan');
const {dbQueue, insertScannerResult} = require('./processor/db');

scanQueue.on('error', (error) => {
  logger.error(error)
});

scanQueue.on('completed', (job, result) => {
  logger.info('scan job done: ')
  // logger.info(job.data)

  insertScannerResult(result)
  //dbQueue.add({query: 'SELECT * FROM library LIMIT 10'})
});

dbQueue.on('error', (error) => {
  logger.error(error)
});

dbQueue.on('completed', (job, result) => {
  // logger.info(job.data)
  logger.info(result);
})


module.exports = {
  scanQueue,
  dbQueue,
}