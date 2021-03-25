const databases = require('../database');


function worker(job)
{
  console.log(databases);
  return new Promise((resolve, reject) => {
    console.log(`${job} on database Queue`);
    resolve(true);
  })
}

module.exports = worker;
