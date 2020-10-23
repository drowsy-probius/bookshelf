// do first scan
// and watch libirary folder
// https://bezkoder.com/node-js-watch-folder-changes/
// get basedir info from ../bin/www

const fs = require("fs");
const path = require("path");

const model = require("./model");
const fileHandler = require('./filehandler/main');




/*********** inner funcitons *************/

const __scanDirectory = async (dir) => 
{
  try
  {
    const files = await fs.promises.readdir(dir, {withFileTypes:true});

    for(let i=0; i<files.length; i++)
    {
      const file = files[i];
      const target = path.join(dir, file.name);

      if(file.isDirectory())
      {
        /**
         * IF all files in a directory is picture, 
         * THEN consider it as a book.
         * ELSE recursive scan on the directory.
         */
        const _folder = await fs.promises.readdir(target, {withFileTypes:true});
        let isBook = true;
        
        for(let j=0; j<_folder.length; j++){
          const _file = _folder[j];
          if(_file.isDirectory())
          {
            isBook = false;
            break;
          }
          else if(_file.isFile())
          {
            const ext = _file.name.split('.').pop();
            if( !['jpg', 'png', 'gif'].includes(ext) )
            {
              isBook = false;
              break;
            }
          }
        }
        
        if(isBook)
        {
          let _preview = await fileHandler.preview.folder(target);
          let book = new model.book();

          book.type = 'folder';
          book.path = target;
          book.parent = dir.split('/').pop();
          book.added = new Date().getTime();
          book.last_seen_page = 0;
          book.preview = _preview;
          book.group = '*';

          model.library.put(book);
        }
        else
        {
          __scanDirectory(target);
        }

      }
      else if(file.isFile())
      {
        /**
         * IF it is a file,
         * THEN it would be one of zip, txt, pdf, epub, ...
         */
        let typeinfo = await fileHandler.filetype(target);

        if( ['jpg', 'png', 'gif'].includes(typeinfo.ext) )
        {
          continue;
        }

        let _preview = await fileHandler.preview[typeinfo.ext](target);
        let book = new model.book();

        book.type = typeinfo.ext;
        book.path = target;
        book.parent = dir.split('/').pop();
        book.added = new Date().getTime();
        book.last_seen_page = 0;
        book.preview = _preview;
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