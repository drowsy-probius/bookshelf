/**
 * ./server/controller/filehandler/index.js
 */

// export * from './type/epub';

// export * from './type/pdf';

const folder = require('./type/folder');

const text = require('./type/text');
const zip = require('./type/zip');

module.exports = {
  folder,
  text,
  zip,
}