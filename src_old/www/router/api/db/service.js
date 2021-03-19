const bookshelf = require('./connect');

function getFirst10FromLibrary()
{
  return bookshelf.prepare(`SELECT * FROM library LIMIT 10`).all();
}

function getRandom10FromLibrary()
{
  return bookshelf.prepare(`SELECT * FROM library ORDER BY RANDOM() LIMIT 10`).all()
}



module.exports = {
  getFirst10FromLibrary,
  getRandom10FromLibrary,
}