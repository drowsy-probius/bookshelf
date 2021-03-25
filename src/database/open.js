const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const {databaseDirectory} = require('../../config');
const {loggerDatabase} = require('../log');

function open(name)
{
  return new Promise((resolve, reject) => {
    try
    {
      let databasePath = name;
      if(name !== ':memory:')
      {
        !fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});
        databasePath = path.join(databaseDirectory, name);
      }

      const database = BetterSqlite3(databasePath, {verbose: loggerDatabase});
      
      resolve(database);
    }
    catch(e)
    {
      reject(e);
    }
  })
}

module.exports = open;