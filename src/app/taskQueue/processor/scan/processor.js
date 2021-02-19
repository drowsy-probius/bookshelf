const { logger } = require('../../../log');
const Scanner = require('./Scanner');

function processor(job, done)
{
  /**
   * job.data, job.id
   * do some long work
   */
  const {path, scanner} = job.data;

  require('../../../plugins/scanner').loadScanner();
  const scanJob = new Scanner(path, scanner);
  scanJob.scan();
  logger.info(`Processing job-${job.id} Attempt: ${job.attemptsMade}`);

  done(null, scanJob.result)
}

module.exports = processor;