const {bookshelf} = require('../../../db');

function isQueryReturnsData(rawQuery)
{
  return !/^insert|create|drop|delete|set/i.test(rawQuery);
}

function processor(job, done)
{
  const {query, data} = job.data;


  const bookshelfQuery = bookshelf.prepare(query);
  let executor = 'run';

  if(isQueryReturnsData(query))
  {
    executor = 'all'
  }

  if(data === undefined)
  {
    done(null, bookshelfQuery[executor]())
  }
  else if(typeof data === typeof [])
  {
    const executeBulk = bookshelf.transaction((data) => {
      for(const datum of data)
      {
        bookshelfQuery[executor](datum);
      }
    });

    done(null, executeBulk(data))
  }
  else
  {
    cone(null, bookshelfQuery[executor](data))
  }

}

module.exports = processor;