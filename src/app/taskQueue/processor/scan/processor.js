const { logger } = require('../../../log');
const Scanner = require('./Scanner');

async function processor(job, done)
{
  /**
   * job.data, job.id
   * do some long work
   */
  // const {scanner, path} = job.data;
  const path_module = require('path');
  const {scanner, path} = {scanner: 'default', path: path_module.join(__dirname, '../../../../../books')}

  console.log('------ in scanQueue -------')
  require('../../../plugins/scanner').loadScanner();
  const test = new Scanner(path, scanner);
  test.scan();
  logger.info('result: ')
  logger.info(test.result)
  logger.info('performance: ' + (test.end - test.start) + 'ms.')
  // console.log(`Processing job-${job.id} Attempt: ${job.attemptsMade}`);
  

  console.log('------ out scanQueue -------')
}

processor();

module.exports = processor;