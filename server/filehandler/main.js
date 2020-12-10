/**
 * ./server/filehandler/main.js 
 */

// common
const fs = require('fs');
const path = require('path');
const readChunk = require('read-chunk');
const console = require('../log');

// check file type
const FileType = require('file-type');

// txt
const iconvlite = require('iconv-lite');
const chardet = require('chardet');

// zip, cbz
const StreamZip = require('node-stream-zip');

//pdf
const {pdf2png} = require('./pdf2png');

// epub

// folder with pics



// folder to zip
const archiver = require('archiver');
const archive = archiver('zip', {
  zlib: { level: 0 } // Sets the compression level.
});


// image processing
const sharp = require('sharp');
const { resolve } = require('path');

const canvas = require('canvas');


/******************** functions *************************/

const __get_title = (target, isFolder=false) => {
  let title = '';
  let episode = 0;

  let tmp = target.split('/').pop();
  if( !isFolder ) tmp = tmp.split('.').slice(0, -1).join('');

  tmp = tmp.replace(/\[.*\]|\(.*\)/g, '').trim();

  let num = tmp.match(/\d+/);
  if(num && num !== null && num !== undefined)
  {
    title = tmp.slice(0, num.index).trim();
    episode = num[0];
  }
  else
  {
    episode = 0;
    title = tmp;
  }

  if(title.length < 1)
  {
    return {title: target.split('/').pop(), episode: ``};
  }

  return {title: title, episode: episode}
}

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
        resolve( image.resize({height: 283}).png().toBuffer() );
      }else{
        resolve( image.resize({width: 200}).png().toBuffer() );
      }
    })
  })
}


const buf2txt = (buffer) => {
  return new Promise(async (resolve, reject) => {
    try
    {
      let encoding = await chardet.detect(buffer);
      encoding = encoding_str_convert(encoding);
      let data = iconvlite.decode(buffer, encoding);
  
      resolve(data);
    }
    catch(e)
    {
      reject(e);
    }
  })
}



/*********************** functions **************/
const __get_one_txt = (target, idx) => {
  return new Promise( async (resolve, reject) => {
    try{
      const buffer = await fs.promises.readFile(target);
      let data = await buf2txt(buffer);
      data = data.split(/\n\r|\n/);
      resolve(data[idx]);
    }catch(e){
      reject(e);
    }
  })
}

const __get_one_zip = (target, idx) => {
  return new Promise( (resolve, reject) => {
    const zip = new StreamZip({
      file: target,
      storeEntries: true
    });

    zip.on('ready', async ()=>{
      let files = Object.values(zip.entries());
      files = files.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });

      const pic = zip.entryDataSync(files[idx].name);

      resolve(pic);

      zip.close();
    });

    zip.on('error', err => { reject(err); });
  })
}

const __get_one_folder = (target, idx) => {
  return new Promise( async (resolve, reject) => {
    let files = await fs.promises.readdir(target, {withFileTypes: true});
    files = files.sort((a, b) => {
      return parseInt(a.name) - parseInt(b.name);
    });
    let _idx = 0;
    for(let i=0; i<files.length; i++){
      const file = files[i];
      if(file.isFile() === true)
      {
        if( ['jpg', 'png', 'gif'].includes( file.name.split('.').pop() ) )
        {
          if(_idx === idx){
            resolve(await fs.promises.readFile(path.join(target, file.name)));
          }
          _idx++;
        }
      }
    }
  })
}

const __get_one_pdf = (target, idx) => {
  return new Promise( async (resolve, reject) => {
    const pdf = new pdf2png(target);
    const pic = await pdf.getOne(idx);
    resolve(pic);
  })
}

const __preview_txt = (file) => {
  return new Promise( async (resolve, reject) => {
    try{
      await fs.promises.access(file); // check file exists

      const buffer = await fs.promises.readFile(file);
      let data = await buf2txt(buffer);
      data = data.split(/\n\r|\n/)
      let preview = data.slice(0, 15).join('\n');

      resolve({preview: preview, pages: data.length});
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

      const zip = new StreamZip({
        file: file,
        storeEntries: true
      });

      zip.on('ready', async () => {
        let files = Object.values(zip.entries());
        files = files.filter(k => ['jpg', 'gif', 'png'].includes(k.name.split('.').pop()) );
        files = files.sort((a, b) => {
          return parseInt(a.name) - parseInt(b.name);
        });

        const preview = await resize_preview( zip.entryDataSync(files[0].name) );
        resolve({preview: preview, pages: files.length});
        zip.close();
        
      })

      zip.on('error', err => { reject(err);});
    }catch(e){
      reject(e);
    }
  })
}

const __preview_pdf = (file) => {
  return new Promise(async (resolve, reject) => {
    try
    {
      const pdf = new pdf2png(file);
      const pages = await pdf.getnumPages();
      const preview = await resize_preview(await pdf.thumbnail());

      resolve({preview: preview, pages: pages});
      pdf.destroy();
    }
    catch(e)
    {
      console.file(`${file} cannot be processed.`, '/filehandler/main.js');
      reject(e);
    }

  })
}

const __preview_folder = (folder) => {
  return new Promise(async (resolve, reject) => {
    try{
      let files = await fs.promises.readdir(folder, {withFileTypes:true});
      files = files.filter(k => ['jpg', 'gif', 'png'].includes(k.name.split('.').pop() ))
      files = files.sort((a, b) => {
        return parseInt(a.name) - parseInt(b.name);
      });

      const preview = await resize_preview(await fs.promises.readFile(path.join(folder, files[0].name)));
      resolve({preview: preview, pages: files.length});

    }catch(e){
      reject(e);
    }
  })
}

const __send_folder_to_zip = (doc, res) => {
  archive.pipe(res);
  archive.directory(doc.path, false);
  archive.finalize();
}

const __get_tags_from_filename = (filename) => {
  const regexp = /\[[^\]]*\]|\([^)]*\)/g;
  let tags = [];

  [...filename.matchAll(regexp)].forEach(e => {
    e = e[0].slice(1, -1);
    e = e.split(/,\W+/);
    e.forEach(m => tags.push(m));
  })
  
  return tags;
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

module.exports.title = __get_title;

module.exports.buffer = {
  txt: buf2txt
}

module.exports.getOne = {
  txt: __get_one_txt,
  zip: __get_one_zip,
  folder: __get_one_folder,
  pdf: __get_one_pdf
}

module.exports.folder2zip = __send_folder_to_zip;

module.exports.tagsFromFilename = __get_tags_from_filename;