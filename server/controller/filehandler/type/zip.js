import StreamZip from 'node-stream-zip';

import Book from '../Book';
import {resizePreview} from '../image';
import {imageExtensions} from '../../../constants';

function filteredData(filePath)
{
  return new Promise( (resolve, reject) => {
    const zip = new StreamZip({
      file: filePath,
      storeEntries: true
    });
  
    zip.on('ready', () => {
      const allFiles = Object.values(zip.entries());
      const imageFiles = allFiles.filter(file => {
        imageExtensions.includes(file.name.split('.').pop())
      });
  
      /**
       * assume file names are like -
       * sometitle001.jpg, sometitle002.jpg, ...
       */
      const sortedImageFiles = imageFiles.sort((fileA, fileB) => {
        return parseInt(fileA.name) - parseInt(fileB.name);
      });
  
      resolve(sortedImageFiles);
      zip.close();
    });
  
    zip.on('error', err => {
      reject(err);
      zip.close();
    })
  })
}

class BookZip extends Book{
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

  setPreview()
  {
    filteredData(this.path)
    .then(imageFiles => {
      return new Promise((resolve, reject) => {
        const zip = new StreamZip({file: this.path});
        const imageBuffer = zip.entryDataSync(imageFiles[0].name);
        resolve(imageBuffer);
      })
    })
    .then(imageBuffer => {
      return new Promise(async (resolve) => {
        const preview = await resizePreview(imageBuffer);
        resolve(preview);
      })
    })
    .then(preview => {
      this.preview = preview;
    })
    .catch(e => {
      throw e;
    })
    
  }

  setPages()
  {
    filteredData(this.path)
    .then(imageFiles => {
      this.pages = imageFiles.length;
    })
    .catch(e => {
      throw e;
    })
  }
}

export default BookZip;