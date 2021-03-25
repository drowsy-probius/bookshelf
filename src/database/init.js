const createTables = require('./createTables');

function init(name, database)
{
  return createTables[name](database);
}

module.exports = init;
