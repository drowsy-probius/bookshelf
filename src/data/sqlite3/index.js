const fs = require('fs');
const path = require('path');
const BetterSqlite3 = require('better-sqlite3');
const {timeZone, databaseDirectory} = require('../../../config');
const {loggerDatabase} = require('../../log');

!fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});
const boolshelfDatabasePath = path.join(databaseDirectory, 'bookshelf.db');

let boolshelfDatabase = BetterSqlite3(boolshelfDatabasePath, {verbose: loggerDatabase});


/**
 * create tables
 */
function initBookshelfDatabase()
{
  boolshelfDatabase.prepare(`CREATE TABLE IF NOT EXISTS library(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    auth_user TEXT,
    created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
    updated_at TIMESTAMP
  );`).run();
  
  boolshelfDatabase.prepare(`CREATE TABLE IF NOT EXISTS meta(
    id INTEGER NOT NULL,
    title TEXT NOT NULL,
    tags TEXT,
    writer TEXT,
    bundle TEXT,
    thumbnail TEXT,
    updated_at TIMESTAMP,
    FOREIGN KEY (id) REFERENCES library(id)
  )`).run();
  
  boolshelfDatabase.prepare(`CREATE TABLE IF NOT EXISTS setting(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    auth TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  )`).run();
}


module.exports = {
  boolshelfDatabase,
  initBookshelfDatabase,
}