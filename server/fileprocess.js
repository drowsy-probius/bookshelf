/**
 * ./server/fileprocess.js
 */

// do first scan
// and watch libirary folder
// https://bezkoder.com/node-js-watch-folder-changes/
// get basedir info from ../bin/www

const fs = require("fs");
const path = require("path");

const model = require("./model");
const fileHandler = require('./filehandler/main');

const console = require('./log');




/*********** inner funcitons *************/

const is_book_folder = (target) => {
  return new Promise( async (resolve, reject) => {
    const _folder = await fs.promises.readdir(target, {withFileTypes:true});
    for(let i=0; i<_folder.length; i++){
      const _file = _folder[i];
  
      if(_file.isDirectory())
      {
        resolve(false);
      }
      else if(_file.isFile())
      {
        const ext = _file.name.split('.').pop();
        if( ['jpg', 'png', 'gif'].includes(ext) === false )
        {
          resolve(false);
        }
      }
    }
    resolve(true);
  })
}


/**
 * @param {Array of Strings} dirs 
 */
const __scanDirectory = (dirs) => 
{
  try
  {
    dirs.forEach(async dir => {
      const files = await fs.promises.readdir(dir, {withFileTypes:true});

      for(let i=0; i<files.length; i++)
      {
        const file = files[i];
        const target = path.join(dir, file.name);

        if(file.isDirectory() === true)
        {
          /**
           * IF all files in a directory is picture, 
           * THEN consider it as a book.
           * ELSE recursive scan on the directory.
           */
          let folders = [];

          if( ( await is_book_folder(target) ) === true)
          {
            if( model.library.isDuplicate(target) === true ){
              console.file([`${target} is already in db.`], '/fileprocess.js');
              continue;
            }
            
            console.file([`found a new book: ${target}`], '/fileprocess.js');
            const info = await fileHandler.preview.folder(target);
            let book = new model.book();

            book.type = 'folder';
            book.title = fileHandler.title(target, true);
            book.tags = fileHandler.tagsFromFilename(target.split('/').pop());
            book.path = target;
            book.parent = dir.split('/').pop();
            book.added = new Date().getTime();
            book.last_seen_page = 0;
            book.pages = info.pages;
            book.preview = info.preview;
            book.group = '*';

            model.library.put(book);
          }
          else
          {
            folders.push(target);
          }

          __scanDirectory(folders);

        }
        else if(file.isFile() === true)
        {
          /**
           * IF it is a file,
           * THEN it would be one of zip, txt, pdf, epub, ...
           */
          if( await model.library.isDuplicate(target) === true ){
            console.file([`${target} is already in db.`], '/fileprocess.js');
            continue;
          }

          //let typeinfo = await fileHandler.filetype(target);
          let ext = target.split('.').pop();
          if(ext === 'zip' || ext === 'cbz'){
            ext = 'zip';
          }else if(ext === 'pdf'){
            ext = 'pdf';
          }else if(ext === 'txt'){
            ext = 'txt';
          }else if(ext === 'epub'){
            ext = 'pdf';
          }else{
            console.file([`not a book: ${target}`], '/fileprocess.js');
            continue;
          }

          console.file([`found a new book: ${target}`], '/fileprocess.js');
          const info = await fileHandler.preview[ext](target);
          let book = new model.book();

          book.type = ext;
          book.title = fileHandler.title(target, false);
          book.tags = fileHandler.tagsFromFilename(target.split('/').pop());
          book.path = target;
          book.parent = dir.split('/').pop();
          book.added = new Date().getTime();
          book.last_seen_page = 0;
          book.pages = info.pages;
          book.preview = info.preview;
          book.group = '*';

          model.library.put(book);
        }
        else
        {
          /**
           * neither folder nor file
           * pass
           */
        }

      }
    });
  }
  catch(e)
  {
    console.error(e);
    console.trace();
  }
}


const __watch = async (_dir) => 
{

}


///


/*********** modules *******************/

module.exports.init = __scanDirectory;

module.exports.watch = __watch;





/// test
(async()=>{
  // let preview = await fileHandler.preview.folder('/home/k123s456h/project/bookshelf/books/바라카몬 01');
  // // console.log(preview);
  // // fs.writeFile('test.png', preview, (e) => {

  // // });

  //let preview = await fileHandler.preview.txt('/home/k123s456h/project/bookshelf/books/달빛조각사 1-58권/달빛조각사 50.txt');
  //console.log(preview);

  // error case
  //let preview2 = await fileHandler.preview.txt('/home/k123s456h/project/bookshelf/books/달빛조각사 1-58권/달빛조각사');
  //console.log(preview2);

  //let zip_preview = await fileHandler.preview.zip('/home/k123s456h/project/bookshelf/books/케이온!/케이온! 02.zip');

})();

/**test files

local
'/home/k123s456h/project/bookshelf/books/바라카몬 01'
'/home/k123s456h/project/bookshelf/books/달빛조각사 1-58권/달빛조각사 50.txt'
'/home/k123s456h/project/bookshelf/books/케이온!/케이온! 02.zip'
'/home/k123s456h/project/bookshelf/books/1 - Harry Potter and the Sorcerer's Stone.pdf'

remote
'/mnt/gdrive/E-books/만화/신과함께.cbz'

*/