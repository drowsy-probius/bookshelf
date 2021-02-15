module.exports = async function(job, done)
{
  /**
   * job.data, job.id
   * do some long work
   */
  console.log('------ in scanQueue -------')
  console.log(`Processing job-${job.id} Attempt: ${job.attemptsMade}`);
  console.log('------ in scanQueue -------')
  
  wait().then(()=>{
    console.log('promise success')
    done(null, 'success')
  })
  .catch(()=>{
    done(job, 'fail')
  })
}

function wait(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  })
}