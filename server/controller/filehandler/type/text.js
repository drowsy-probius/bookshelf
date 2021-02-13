const fs = require('fs');

const iconvlite = require('iconv-lite');
const chardet = require('chardet');

const Book = require('../Book');

/**
 * convert 'chardet' format to 'iconvlite' format
 * 
 * @param {string} type 
 */
function encodingTypeConvert(type)
{
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

function bufferToText(buffer)
{
  return new Promise(async (resolve, reject) => {
    try
    {
      const chardetEncoding = await chardet.detect(buffer);
      const iconvliteEncoding = encodingTypeConvert(chardetEncoding);
      const data = iconvlite.decode(buffer, iconvliteEncoding);

      resolve(data);
    }
    catch(e)
    {
      reject(e);
    }
  })
}

async function filteredData(filePath)
{
  const buffer = await fs.promises.readFile(filePath);
  const rawData = await bufferToText(buffer);
  const escapedData = rawData.split(/\n\r|\n/);

  return escapedData;
}


class BookText extends Book
{
  constructor(filePath)
  {
    try
    {
      super(filePath);

      this.setPreview();
      this.setPages();
    }
    catch(e)
    {
      throw e;
    }
  }

  
  /**
   * set (first 15 lines) as (this.preview)
   * 
   */
  setPreview()
  {
    filteredData(this.path)
    .then(data => {
      this.preview = data.slice(0, 15).join('\n');
    })
    .catch(e => {
      throw e;
    })
  }


  /**
   * set (line length) as (this.pages)
   * 
   */
  setPages()
  {
    filteredData(this.path)
    .then(data => {
      this.pages = data.length;
    })
    .catch(e => {
      throw e;
    })
  }

}

module.exports = BookText;