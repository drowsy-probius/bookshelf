const model = require('../model');

const console = require('../log');

const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve, ms)
  });
};

let worker = null;
let bookSentList = [];
let bookSentCount = 0;

const _index = index => {
  index.on('connect', async socket => {
    console.socket([`/index`], '/sockets/index.js');
    bookSentList = [];
    bookSentCount = 0;

    const index_send = async (pagesize, offset)=>{
      const db = await model.library.get_all(pagesize, offset);
      const db_length = await model.library.length();
      const books = db.rows.map(function(item){return item.doc;});
      const hasNext = db_length > offset + books.length;      

      for(let i=0; i<books.length; i++){
        let book = books[i];

        if( !bookSentList.includes(book._id) ){
          if(book.type !== 'txt'){
            book.preview = Buffer.from(book.preview);
          }
    
          socket.emit('book', { book:book, hasNext: hasNext });
        }
        

        if( (bookSentList.length+1)%5 == 0 ){
          await sleep(10);
        }
      }
    };
    

    socket.on('index', data => {
      if(worker){
        clearInterval(worker);
        worker = null;
      }

      index_send(data.pagesize, data.offset);

      if(bookSentCount < data.pagesize)
      {
        worker = setInterval( ()=>{
          if(bookSentCount >= data.pagesize)
          {
            console.socket([`all requested entries sent.`], '/sockets/index.js');
            clearInterval(worker);
          }
          index_send(data.pagesize, data.offset); 
        }, 1000);
      }
    });

    socket.on('received', data => {
      bookSentList.push(data.book);
      bookSentCount++;
    });

    socket.on('disconnect', ()=>{
      console.socket([`disconnected from /index`], '/sockets/index.js');
      if(worker){
        clearInterval(worker);
      }
    });
  })
};

/*********************************/

module.exports.index = _index;