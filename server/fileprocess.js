// do first scan
// and watch libirary folder
// https://bezkoder.com/node-js-watch-folder-changes/
// get basedir info from ../bin/www

const fs = require("fs");
const FileType = require("file-type");
const path = require("path");
const colors = require("colors");

const model = require("./model");

const basedir = path.resolve("./books");

// functions


const firstScan = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err.red);
      console.trace();
    } else {
      files.forEach(async (file) => {
        if (file.isFile()) {
          try {
            let type = await FileType.fromFile(path.join(dir, file.name));
            type = type ? type.ext : file.name.split(".").pop();

            let book = new model.book();
            book.type = type;
            book.path = path.join(dir, file.name);
            book._id = book.path;
            book.parent = dir;
            book.added = new Date().toJSON();
            book.last_seen_page = 0;

            model.library.put(book);
          } catch (e) {
            console.error(e.red);
            console.trace();
          }
        } else {
          // this is folder
          // do recursive work
          firstScan(path.join(dir, file.name));
        }
      });
    }
  });
};

///

//firstScan(basedir);


const fileHandler = require('./filehandler/main');

(async()=>{
  let preview = await fileHandler.preview.folder('/home/k123s456h/project/bookshelf/books/바라카몬 01');
  console.log(preview);
  fs.writeFile('test.png', preview, (e) => {
    
  });

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