const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const {databaseDirectory} = require('../../../config');
const {logger} = require('../log');

class Database {
  constructor(){
    this.directory = databaseDirectory;
    this.path = path.join(this.directory, 'bookshelf.db');
    !fs.existsSync(this.directory) && fs.mkdirSync(this.directory, {recursive: true});
    this.db = BetterSqlite3(this.path, {verbose: logger.debug});
  }
}

module.exports = Database;