const fs = require('fs');
const path = require('path');

const Book = require('../Book');
const {resizePreview} = require('../image');
const {imageExtensions} = require('../../../../config');

async function filteredData(filePath)
{
  const rawFiles = await fs.promises.readdir(filePath, {withFileTypes: true});
  const imageFiles = rawFiles.filter(file => {
    imageExtensions.includes(file.name.split('.').pop())
  });
  const sortedImageFiles = imageFiles.sort( (fileA, fileB) => {
    return parseInt(fileA.name) - parseInt(fileB.name)
  });

  return sortedImageFiles;
}

class BookFolder extends Book{
  constructor(filePath){
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
      return new Promise(async (resolve) => {
        const imagePath = path.join(this.path, imageFiles[0].name);
        const imageBuffer = await fs.promises.readFile(imagePath);
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

module.exports = BookFolder;