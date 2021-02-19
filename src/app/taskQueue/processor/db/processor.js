function processor(job, done)
{
  const {func} = job.data;
  done(null, func())
}

module.exports = processor;