const Scanner = require('./Scanner');

async function processor(job, done)
{
  /**
   * job.data, job.id
   * do some long work
   */
  // const {scanner, path} = job.data;
  const {scanner, path} = {scanner: 'default', path: '../../../../books'}

  console.log('------ in scanQueue -------')
  require('../../../plugins/scanner').loadScanner();
  const test = new Scanner(path, scanner);
  test.scan();
  // console.log(`Processing job-${job.id} Attempt: ${job.attemptsMade}`);
  

  console.log('------ out scanQueue -------')
}

module.exports = processor;