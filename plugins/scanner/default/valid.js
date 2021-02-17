const fs = require('fs');
const path = require('path');

const {fileExtensions, ignoreFileNames, ignoreScanNames} = require('./constants');

function getAllFileExtensions()
{
  const extensions = [];
  for(let i in fileExtensions)
  {
    fileExtensions[i].forEach((ext) => {
      extensions.push(ext);
    })
  }
  return extensions;
}

function doCount(pathORfilename)
{
  if(ignoreFileNames.length === 0)
  {
    return true;
  }

  const filename = pathORfilename.split('/').pop();

  ignoreFileNames.forEach((ignoreName) => {
    const ignoreRegexp = new RegExp(ignoreName);
    if(filename.search(ignoreRegexp) !== -1)
    {
      return false;
    }
  });
  return true;
}

function doScan(pathORfilename)
{
  if(ignoreScanNames.length === 0)
  {
    return true;
  }
  
  const filename = pathORfilename.split('/').pop();

  ignoreScanNames.forEach((ignoreScanName) => {
    const ignoreScanNameRegexp = new RegExp(ignoreScanName);
    if(filename.search(ignoreScanNameRegexp) !== -1)
    {
      return false;
    }
  });
  return true;
}


function isBookFolder(folderPath)
{
  const files = fs.readdirSync(folderPath, {withFileTypes: true});

  for(let i=0; i<files.length; i++)
  {
    const file = files[i];

    if(file.isDirectory())
    {
      return false;
    }
    else if(!doCount(file.name))
    {
      continue;
    }
    else if(file.isFile())
    {
      const ext = path.extname(file.name);

      if(!fileExtensions.image.includes(ext))
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  return true;
} 

module.exports = {
  getAllFileExtensions,
  doCount,
  doScan,
  isBookFolder,
}