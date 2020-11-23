const StreamZip = require('node-stream-zip');
const model = require('../model');

const console = require('../log');

const send = require('./send').send;

const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve, ms)
  });
};

const _dev = dev => {
  dev.on('connect', async socket => { // 나중에 async하고 get_all 제거


    const db = await model.library.get_all(100, 0);
    const books = db.rows.map(function(item){return item.doc;});
    let idx = Math.floor( Math.random() * books.length );

    while(books[idx].type !== 'zip'){
      idx++;
    }
    let file = books[idx].path;

    socket.emit('doc', {doc: books[idx]});
    console.socket([books[idx]], '/sockets/dev.js');

    const zip = new StreamZip({
      file: file,
      storeEntries: true
    });

    zip.on('ready', async ()=>{
      const files = Object.values(zip.entries());
      for(let i = 0; i<files.length; i++){
        const file = files[i];

        if( !['jpg', 'png', 'gif'].includes(file.name.split('.').pop()) )
        {
          continue;
        }

        const pic = zip.entryDataSync(file.name);
        /**
         * 강제로 sleep안하면 많은 데이터가
         * 한번에 넘어가서 클라이언트에서 로딩이 오래걸림
         */
        console.socket([file.name, file.size], '/sockets/dev.js');
        await sleep(1);
        socket.emit('pic', {pic: pic, idx: i});
      }

      zip.close();
    });

    zip.on('error', err => { console.error(err); });
  })
};

/*********************************/

module.exports.dev = _dev;