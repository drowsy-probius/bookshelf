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

      socket.emit('pic', {pic: pic, idx: i - 1});

      await sleep(10);
    }
    pdf.destroy();
  },

  epub: (target, socket) => {
    // ???
  }
}

module.exports.send = send;