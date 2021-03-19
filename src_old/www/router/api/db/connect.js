const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const {databaseDirectory} = require('../../../../../config');
const {loggerDatabase} = require('../../../../log');

!fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});

const bookshelfPath = path.join(databaseDirectory, 'bookshelf.db');
const bookshelf = BetterSqlite3(bookshelfPath, {verbose: loggerDatabase});

module.exports = bookshelf;