function init(database)
{
  return new Promise((resolve, reject) => {
    try
    {
      database.prepare(`CREATE TABLE IF NOT EXISTS library(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        auth_user TEXT,
        created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')) NOT NULL,
        updated_at TIMESTAMP
      );`).run();
      
      database.prepare(`CREATE TABLE IF NOT EXISTS meta(
        id INTEGER NOT NULL,
        title TEXT NOT NULL,
        tags TEXT,
        writer TEXT,
        bundle TEXT,
        thumbnail TEXT,
        updated_at TIMESTAMP,
        FOREIGN KEY (id) REFERENCES library(id)
      )`).run();
      
      database.prepare(`CREATE TABLE IF NOT EXISTS setting(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        auth TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )`).run();
      
      resolve(database);
    }
    catch(e)
    {
      reject(e);
    }
  })
}

module.exports = init;
