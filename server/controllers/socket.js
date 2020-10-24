const url = require('url');

let worker = {index: null, };
let bookSentList = [];


const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

module.exports.socket = (io) => {

  const index = io.of('/index');
  index.on('connect', async socket => {
    if(worker && worker.index){
      clearInterval(worker.index);
    }
    bookSentList = [];
    console.log('index');

    worker.index = setInterval(async ()=>{
      const model = require('../model');
      const db = await model.library.get_all(100, 0);
      const books = db.rows.map(function(item){return item.doc;});
      
      for(let i=0; i<books.length; i++){
        let book = books[i];

        if( !bookSentList.includes(book._id) ){
          bookSentList.push(book._id);

          if(book.type !== 'txt'){
            book.preview = Buffer.from(book.preview);
          }
    
          socket.emit('index', { book });
        }
        

        if( (bookSentList.length+1)%10 == 0 ){
          await sleep(10);
        }
      }
    }, 1000);

  });
  index.on('disconnect', () => {
    console.log('disconnected from index');
    if(worker && worker.index){
      clearInterval(worker.index);
    }
  })



  const dev = io.of('/dev');
  dev.on('connect', socket => {
    const StreamZip = require('node-stream-zip');

    let file = ''
    let check = new Date()%3;
    if( check === 0){
      file = '/mnt/gdrive/E-books/만화/바라카몬/바라카몬 02.zip';
    }else if(check === 1){
      file = '/mnt/gdrive/E-books/만화/바라카몬/바라카몬 03.zip';
    }else{
      file = '/mnt/gdrive/E-books/만화/바라카몬/바라카몬 01.zip';
    }

    console.debug(file);

    const zip = new StreamZip({
      file: file,
      storeEntries: true
    });

    const MAXSIZE = 1024 * 1024 * 2; // 2MB
    let currentsize = 0;
    zip.on('ready', async ()=>{
      const files = Object.values(zip.entries());
      for(let i = 0; i<files.length; i++){
        const file = files[i];
        const pic = zip.entryDataSync(file.name);

        /**
         * 강제로 sleep안하면 많은 데이터가
         * 한번에 넘어가서 클라이언트에서 로딩이 오래걸림
         */
        currentsize += file.size;
        if(currentsize > MAXSIZE){
          currentsize = 0;
          await sleep(100);
        }

        socket.emit('pic', {pic: pic, idx: i});
      }

      zip.close();
    });

    zip.on('error', err => { console.error(err); });
  })

}