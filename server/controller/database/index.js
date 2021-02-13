const BetterSqlite3 = require('better-sqlite3');

const {logger} = require('../../log')

class Database {
  constructor(){
    this.db = BetterSqlite3('../../database/bookshelf.db', {verbose: logger.debug});
  }
}


module.exports = Database;