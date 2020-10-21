/********************** modules **************************/

// common
const fs = require('fs');
const path = require('path');
const readChunk = require('read-chunk');

// check file type
const FileType = require('file-type');

// txt
const iconvlite = require('iconv-lite');
const chardet = require('chardet');

// zip, cbz
const StreamZip = require('node-stream-zip');

// epub, pdf

// folder with pics

// image processing
const sharp = require('sharp');
const { resolve } = require('path');


/******************** functions *************************/

const __filetype = (target) => {
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

/* for txt file processing */
/* convert 'chardet' format to 'iconvlite' format */
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


/* Promise<resized image buffer> */
const resize_preview = (buffer) => {
  return new Promise((resolve, reject) => {
    const image = sharp(buffer);
    image.metadata((err, metadata) => {
      if(metadata.width > metadata.height){
        resolve( image.resize({height: 212}).png().toBuffer() );
      }else{
        resolve( image.resize({width: 150}).png().toBuffer() );
      }
    })
  })
}




/******** preview functions **************/
const __preview_txt = (file) => {
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
  })
}

const __preview_zip = (file) => {
  return new Promise( async (resolve, reject) => {
    try{
      await fs.promises.access(file); // check file exists

      let stats = await fs.promises.stat(file);
      let preview = null;

      if(stats.size < 26214400){  
        // a small file; less than 25mb
        console.debug(`small file; ${file}`.gray)
        const zip = new StreamZip({
          file: file,
          storeEntries: true
        });

        zip.on('ready', () => {
          let first = null;
          for (const entry of Object.values(zip.entries())) {
            if( ['jpg', 'gif', 'png'].includes(entry.name.split('.').pop()) ){
              first = entry;
              break;
            }
          }

          preview = zip.entryDataSync(first.name);
          resolve(resize_preview(preview))
          zip.close();
        });
        zip.on('error', err => { reject(err); });
      }else{  
        // a big file; more or equal than 25mb
        console.debug(`big file; ${file}`.gray)
        const zip = new StreamZip({
          file: file,
          storeEntries: true
        });

        zip.on('entry', entry => {
          if( ['jpg', 'gif', 'png'].includes(entry.name.split('.').pop()) ){
            preview = zip.entryDataSync(entry.name);
            resolve(resize_preview(preview));
            zip.close();
          }
        });
        zip.on('error', err => { reject(err); });
      }
    }catch(e){
      reject(e);
    }
  })
}

const __preview_pdf = (file) => {

}

const __preview_folder = (folder) => {
  return new Promise(async (resolve, reject) => {
    try{
      const files = await fs.promises.readdir(folder, {withFileTypes:true});
      for(const file of files){
        if(['jpg', 'png', 'gif'].includes(file.name.split('.').pop())){
          
          resolve(resize_preview(
            await fs.promises.readFile(path.join(folder, file.name)
                  )));

          break;
        }
      }
    }catch(e){
      reject(e);
    }
  })
}

/***************** modules ****************************/

/* return Promise<{"ext": "zip", "mime": "application/zip"}> */
module.exports.filetype = __filetype;

/* return Promise<blob or txt> */
module.exports.preview = {
  txt: __preview_txt,
  zip: __preview_zip,
  pdf: __preview_pdf,
  folder: __preview_folder
}
