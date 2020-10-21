const fs = require('fs');

// file type
const FileType = require('file-type');
const readChunk = require('read-chunk');
const path = require('path');

// txt
const iconvlite = require('iconv-lite');
const chardet = require('chardet');

// zip
const StreamZip = require('node-stream-zip');



/********************************************************/

const encoding_str_convert = (str) => {
  if(str === 'UTF-8'){
    return 'utf8';
  }else if(str === 'UTF-16 BE'){
    return 'UTF-16BE';
  }else if(str.startsWith('windows-')){
    return str.split('-').join('');
  }else if(str.startsWith('koi8')){
    return str.toLowerCase();
  }else{
    return str;
  }
}

const buffer_to_int = (buf) => {
  return parseInt(buf.reverse().toString('hex'), 16);
}


const __zip_analyzer = (file) => {
  const CHUNKSIZE = 1024;
  const EOCD_SIGNATURE = Buffer.from('504b0506', 'hex');
  const CD_SIGNATURE = Buffer.from('504b0102', 'hex');

  return new Promise( async (resolve, reject) => {
    const stats = await fs.promises.stat(file);
    let idx, tmp, buffer, startidx, ptr;

    let EOCD = {
      "SIGNATURE": EOCD_SIGNATURE,
      "startAddress": -1,
      "numberOfCentralDirectory": -1,
      "sizeOfCentralDirectory": -1,
      "offsetOfDirectoryRecords": -1,
    }
    let CD = {
      "SIGNATURE": CD_SIGNATURE,
      "start": -1,
      "versionMadeBy": -1,
      "versionNeededToExtract": -1,
      "flag": -1,
      "compressedMethod": -1,
      "modtime": -1,
      "uncompressedSize": -1,
      
    }

    /*** End of Central Directory **/
    startidx = stats.size-CHUNKSIZE < 0 ? 0 : stats.size-CHUNKSIZE;
    tmp = await readChunk(file, startidx, CHUNKSIZE);
    buffer = Buffer.from(tmp);

    while( buffer.indexOf(EOCD.SIGNATURE) == -1 ){
      console.log(buffer);
      if(startidx == stats.size - CHUNKSIZE){
        reject('it is not a zip file.');
        break;
      }
      startidx = stats.size - CHUNKSIZE < 0 ? 0 : stats.size - CHUNKSIZE;
      tmp = await readChunk(file, startidx, CHUNKSIZE + 3);
      buffer = Buffer.from(tmp + buffer);
    }
    ptr = 0;
    EOCD.startAddress = startidx + buffer.indexOf(EOCD.SIGNATURE);
    ptr = buffer.indexOf(EOCD.SIGNATURE);
    ptr += 4 + 2 + 2 + 2;
    EOCD.numberOfCentralDirectory = buffer_to_int(buffer.slice(ptr, ptr+2));
    ptr += 2;
    EOCD.sizeOfCentralDirectory = buffer_to_int(buffer.slice(ptr, ptr+4));
    ptr += 4;
    EOCD.offsetOfDirectoryRecords = buffer_to_int(buffer.slice(ptr, ptr+4));
    /* some processing part */
    /* central directory infromation, ... */


    /** Central Directory **/
    console.log(stats.size);
    buffer = Buffer.from(await readChunk(file, EOCD.offsetOfDirectoryRecords, EOCD.sizeOfCentralDirectory));
    console.log(buffer);
    /* some processing part */


  });
}

/********************************************************/

module.exports.filetype = (target) => {
  return new Promise(async (resolve, reject) => {
    try{
      /* checks text files */
      let ext = path.extname(target).slice(1);
      ['txt', 'csv', 'svg'].forEach(e => {
        if(ext === e){
          resolve(JSON.parse(`{"ext": "${ext}", "mime": "text/${ext}"}`));
        }
      })

      /* checks non-text files */
      let stats = await fs.promises.stat(target);
      if(stats.isFile()){
        const buffer = await readChunk(target, 0, 4100);
        let type = await FileType.fromBuffer(buffer);
        resolve(type);
      }else{ 
        reject(JSON.parse(`{"msg": "not a file"}`))
      }
    }catch(e){
      reject(e);
    }
  });
}


module.exports.preview = {
  txt: (file, callback) => {
    return new Promise( async (resolve, reject) => {
      try{
        await fs.promises.access(file); // check file exists

        let buffer = await fs.promises.readFile(file);
        let encoding = await chardet.detectFile(file);
        encoding = encoding_str_convert(encoding);
        let data = iconvlite.decode(buffer, encoding);
        let preview = data.split(/\n\r|\n/).slice(0, 10).join('\n');

        resolve(preview);
      }catch(e){
        reject(e);
      }
    });
  },

  zip: (file) => {
    return new Promise( async (resolve, reject) => {

    })
  },

  pdf: (file) => {

  },

  folder: (file) => {

  }
}

module.exports.zip_analyzer = (file) => {
  return __zip_analyzer(file);
}

module.exports.zip_test = (file) => {
  const zip = new StreamZip({
    file: file,
    storeEntries: true
  });

  zip.on('ready', () => {
    console.log('Entries read: ' + zip.entriesCount);
    let first = Object.values(zip.entries())[0];
    console.log(first);
    const data = zip.entryDataSync(first);
    console.log(data);
    // console.log(first);
    // for (const entry of Object.values(zip.entries())) {
    //     const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
    //     console.log(`Entry ${entry.name}: ${desc}`);
    // }
    // Do not forget to close the file once you're done
    zip.close()
  });

  /*  : big zip file
  zip.on('entry', entry => {
    // you can already stream this entry,
    // without waiting until all entry descriptions are read (suitable for very large archives)
    console.log(`Read entry ${entry.name}`);
  });
  */
}