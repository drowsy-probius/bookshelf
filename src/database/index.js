const openDatabase = require('./openDatabase');

const databaseLists = {
  "main": "bookshelf.db",
}
const databases = {};

databaseLists.forEach((name) => {
  databases[name] = openDatabase(databaseLists[name]);
});

module.exports = databases;