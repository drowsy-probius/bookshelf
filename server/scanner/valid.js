import fs from 'fs';
import path from 'path';

import {imageExtensions, ignoreFileNames} from '../constants';


export function ignoreThis(fileName)
{
  ignoreFileNames.forEach((ignoreName) => {
    const ignoreRegexp = new RegExp(ignoreName);
    if(fileName.search(ignoreRegexp) !== -1)
    {
      return true
    }
  });
  return false;
}


export function isBookFolder(folderPath)
{
  fs.promises.readdir(folderPath, {withFileTypes: true})
  .then((files) => {
    files.forEach((file) => {
      if(ignoreThis(file.name))
      {
        continue;
      }
  
      if(file.isDirectory())
      {
        return false;
      }
      
      if(file.isFile())
      {
        const ext = path.name.split('.').pop();
        if(imageExtensions.includes(ext))
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      
      return false;
    })
  })
  .catch((e) => {
    return false;
  })
} 