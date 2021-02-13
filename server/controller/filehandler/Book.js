const path = require('path')

class Book {
  constructor(filePath){
    this.path = path.resolve(filePath); // absolute full path
    this.pathInfo = path.parse(this.path);

    this.type = 'processing...';
    this.title = 'processing...';
    this.preview = 'processing...';
    this.pages = -1;
    this.tags = [];

    this.setType();
    this.setTitle();
    this.setTags();
  }


  /**
   * set (file extension) as (this.type)
   * 
   */
  setType()
  {
    if(this.pathInfo.ext === '')
    {
      this.type = 'folder';
    }
    else
    {
      this.type = this.pathInfo.ext.slice(1);
    }
  }
  

  /**
   * set (not embraced string) as (this.title)
   * 
   */
  setTitle()
  {
    const fileName = this.pathInfo.name;
    const trimmedName = fileName.replace(/\[.*\]|\(.*\)/g, '').trim();

    this.title = trimmedName;
  }

  /**
   * set (comma splited embraced string) as (this.tags)
   * 
   */
  setTags()
  {
    const regexp = /\[[^\]]*\]|\([^)]*\)/g;
    let tags = [];
    
    [...this.pathInfo.name.matchAll(regexp)].forEach(e => {
      let tag = e[0].slice(1, -1);
      tag = tag.split(/,\W+/);
      tag.forEach(m => tags.push(m));
    });

    this.tags = tags;
  }

}

module.exports = Book;