const url = require('url');

const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

module.exports.socket = (io) => {

  const dev = io.of('/dev');

  dev.on('connect', socket => {
    const StreamZip = require('node-stream-zip');

    let file = ''
    let check = new Date()%3;
    if( check === 0){
      file = '/home/k123s456h/project/bookshelf/books/케이온!/케이온! 02.zip';
    }else if(check === 1){
      file = '/mnt/gdrive/E-books/만화/헌터헌터 신장판/헌터헌터 신장판 1권.cbz'; 
    }else{
      file = '/mnt/gdrive/E-books/만화/신과함께.cbz';
    }

    console.debug(file);

    const zip = new StreamZip({
      file: file,
      storeEntries: true
    });

    zip.on('ready', async ()=>{
      const files = Object.values(zip.entries());
      for(let i = 0; i<files.length; i++){
        const file = files[i];
        const preview = zip.entryDataSync(file.name);

        socket.emit('pic', {preview: preview, idx: i});

        /**
         * 강제로 sleep안하면 많은 데이터가
         * 한번에 넘어가서 클라이언트에서 로딩이 오래걸림
         */
        await sleep(1);
      }

      zip.close();
    });

    zip.on('error', err => { console.error(err); });
  })

}