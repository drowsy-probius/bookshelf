# description

## init point

A module should be a folder and have 'index.js' file. 

Any file in 'scanner' folder will be ignored.

### ./scanner/My First Scanner/index.js

template
```javascript
module.export = function scan(){
  // target directory
  this.root 
  
  /**
   * logger.info(msg, {filename: __filename__})
   * logger.debug(...)
   * logger.error(...)
   */
  this.logger

  /*
   * scan result 
   * object[
   *  {
   *    path: absolutePath,
   *    type: '...'
   *  }
   * ]
   */
  this.result

  // do work!
}
```

In scan function, you can access -this- object.

```javascript
this = {
  root: path of target directory,
  scan: the scan function itself,
  ...,
  may be some db connection?
}
```
