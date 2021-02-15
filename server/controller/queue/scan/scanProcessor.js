module.exports = function(job)
{
  /**
   * job.data, job.id
   * do some long work
   */
  console.log('------ in scanQueue -------')
  return Promise.resolve('result')
}