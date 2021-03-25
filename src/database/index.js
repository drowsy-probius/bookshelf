const openDatabase = require('./open');
const initDatabase = require('./init');

const databaseLists = {
  "main": "bookshelf.db",
  "memory": ":memory:",
}

const databases = {};

Object.keys(databaseLists).forEach( async (name) => {
  try
  {
    databases[name] = await openDatabase(databaseLists[name]);
    await initDatabase(name, databases[name]);
  }
  catch(e)
  {
    throw e;
  }
});


module.exports = databases;
