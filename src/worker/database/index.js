const getDatabases = require('../../database');

function worker(job)
{
  console.log(getDatabases);
  return new Promise(async (resolve, reject) => {
    console.log(`${job} on database Queue`);
    resolve(true);
  })
}

module.exports = worker;
