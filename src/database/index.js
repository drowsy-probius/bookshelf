const openDatabase = require('./open');
const initDatabase = require('./init');

const databases = {};
const databaseLists = {
  "main": "bookshelf.db",
  "memory": ":memory:",
};

async function init()
{
    for(const name in databaseLists)
    {
      databases[name] = await openDatabase(databaseLists[name]);
      await initDatabase(name, databases[name]);
    }
}
init();

module.exports = databases;
