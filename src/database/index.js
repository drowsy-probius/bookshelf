const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const initMainDatabase = require('./init');
const {timeZone, databaseDirectory} = require('../../config');
const {loggerDatabase} = require('../log');

!fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});
const boolshelfDatabasePath = path.join(databaseDirectory, 'bookshelf.db');

let boolshelfDatabase = BetterSqlite3(boolshelfDatabasePath, {verbose: loggerDatabase});

initMainDatabase(boolshelfDatabase);

module.exports = {
  boolshelfDatabase,
}