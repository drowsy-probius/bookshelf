const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const {databaseDirectory} = require('../../config');
const {loggerWrapper} = require('../log');

function openDatabase(name)
{
  let database = undefined;
  if(name === ':memory:')
  {
    database = BetterSqlite3(name, {verbose: loggerWrapper({filename: '[sqlite3] ' + name, notFilePath: true})});
  }
  else
  {
    !fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});
    const databasePath = path.join(databaseDirectory, name);

    database = BetterSqlite3(databasePath, {verbose: loggerWrapper({filename: '[sqlite3] ' + name, notFilePath: true})});
  }
  return database;
}

module.exports = openDatabase;