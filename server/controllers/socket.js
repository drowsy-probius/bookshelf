const fs = require('fs');
const { resolve } = require('path');
const readChunk = require('read-chunk');
const url = require('url');

const model = require('../model');
const fileHandler = require('../filehandler/main');

let worker = {index: null, };
let bookSentList = [];


const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve, ms)
  })
}

const send = {
  zip: (target, socket) => {
    const StreamZip = require('node-stream-zip');

    const zip = new StreamZip({
      file: target,
      storeEntries: true
    });

    zip.on('ready', async ()=>{
      let files = Object.values(zip.entries());
      files = files.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      })

      for(let i = 0; i<files.length; i++){
        const file = files[i];
        const pic = zip.entryDataSync(file.name);
        /**
         * 강제로 sleep안하면 많은 데이터가
         * 한번에 넘어가서 클라이언트에서 로딩이 오래걸림
         */
        await sleep(10);
        socket.emit('pic', {pic: pic, idx: i});
      }

      zip.close();
    });

    zip.on('error', err => { throw new Error(err) });
  },
  
  txt: async (target, socket) => {
    // socket.emit('txt')
    try
    {
      const buffer = await fs.promises.readFile(target);
      let data = await fileHandler.buffer.txt(buffer);

      data = data.split(/\n\r|\n/);

      for(let i=0; i<data.length; i++){
        let line = data[i];
        socket.emit('txt', {txt: line, idx: i});

        if(i === 1000){
          await sleep(100);
        }
      }
      
    }
    catch(e)
    {
      console.error(e);
      console.trace();
    }
  },

  folder: async (target, socket) => {
    // socket.emit('pic')
    const path = require('path');

    let files = await fs.promises.readdir(target, {withFileTypes: true});
    files = files.sort((a, b) => {
      return parseInt(a.name) - parseInt(b.name);
    });

    let idx = 0;
    for(let i=0; i<files.length; i++){
      const file = files[i];
      if(file.isFile() === true)
      {
        if( ['jpg', 'png', 'gif'].includes( file.name.split('.').pop() ) )
        {
          const pic = await fs.promises.readFile(path.join(target, file.name))
          socket.emit('pic', {pic: pic, idx: idx});
          await sleep(10);
          idx++;
        }
      }
    }
  },

  pdf: async (target, socket) => {
    // const buffer = await fs.promises.readFile(target);
    // socket.emit('pdf', {pdf: buffer});
    const {pdf2png} = require('../filehandler/pdf2png');

    const pdf = new pdf2png(target);
    const numPages = await pdf.getnumPages(); 
    for(let i=1; i<=numPages; i++){
      const pic = await pdf.getOne(i);

      socket.emit('pic', {pic: pic, idx: i - 1}, () => {
        console.log(pic.length);
      });

      await sleep(10);
    }
    pdf.destroy();
  },

  epub: (target, socket) => {
    // ???
  }
}


/***************************************************/

module.exports.socket = (io) => {

  const index = io.of('/index');
  index.on('connect', async socket => {
    console.debug('[DEBUG] /index @/controllers/socket.js'.gray);
    bookSentList = [];

    socket.on('received', data => {
      bookSentList.push(data.book);
    });

    socket.on('disconnect', ()=>{
      console.debug('[DEBUG] disconnected from /index @/controllers/socket.js'.gray);
      if(worker && worker.index){
        clearInterval(worker.index);
      }
    })

    if(worker && worker.index){
      clearInterval(worker.index);
    }

    const send = async ()=>{
      const model = require('../model');
      const db = await model.library.get_all(100, 0);
      const books = db.rows.map(function(item){return item.doc;});
      
      for(let i=0; i<books.length; i++){
        let book = books[i];

        if( !bookSentList.includes(book._id) ){
          if(book.type !== 'txt'){
            book.preview = Buffer.from(book.preview);
          }
    
          socket.emit('index', { book });
        }
        

        if( (bookSentList.length+1)%10 == 0 ){
          await sleep(10);
        }
      }
    }

    send();
    worker.index = setInterval(send, 10000);
  });


  const reader = io.of('/reader');
  reader.on('connect', socket => {
    socket.on('id', async (req) => {
      try
      {
        const doc = await model.library.get(req.id);

        console.debug(`[DEBUG] request /reader/${doc._id} -> ${doc.path} @/controllers/socket.js`.gray);

        if( ['zip', 'txt', 'folder', 'pdf', 'epub'].includes(doc.type) )
        {
          send[doc.type](doc.path, socket);
        }
        else
        {
          throw new Error(`unknown type: ${doc._id} - ${doc.path} - ${doc.type} @/controllers/socket.js`);
        }
      }
      catch(e)
      {
        socket.emit('err', {msg: e});
        console.error(e);
      }
    })
  })


  const dev = io.of('/dev');
  dev.on('connect', async socket => { // 나중에 async하고 get_all 제거
    const StreamZip = require('node-stream-zip');

    const db = await model.library.get_all(100, 0);
    const books = db.rows.map(function(item){return item.doc;});
    const idx = Math.floor( Math.random() * books.length );
    const file = books[idx].path;

    console.log(file);

    const zip = new StreamZip({
      file: file,
      storeEntries: true
    });

    zip.on('ready', async ()=>{
      const files = Object.values(zip.entries());
      for(let i = 0; i<files.length; i++){
        const file = files[i];
        const pic = zip.entryDataSync(file.name);
        
        /**
         * 강제로 sleep안하면 많은 데이터가
         * 한번에 넘어가서 클라이언트에서 로딩이 오래걸림
         */
        console.log(file.name, file.size);
        await sleep(1);
        socket.emit('pic', {pic: pic, idx: i});
      }

      zip.close();
    });

    zip.on('error', err => { console.error(err); });
  })

}