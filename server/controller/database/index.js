import * as BetterSqlite3 from 'BetterSqlite3';

import logger from '../../log';

class Database {
  constructor(){
    this.db = BetterSqlite3('../../database/bookshelf.db', {verbose: logger.debug});
  }
}


export default Database;