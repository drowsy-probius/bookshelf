const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const {databaseDirectory} = require('../../../config');
const {logger} = require('../log');

!fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});

const bookshelfPath = path.join(databaseDirectory, 'bookshelf.db');

let bookshelf = BetterSqlite3(bookshelfPath, {verbose: logger.debug});

/**
 * create tables
 */
bookshelf.prepare(`CREATE TABLE IF NOT EXISTS library(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  type TEXT NOT NULL )`).run();

module.exports = {
  bookshelf
}