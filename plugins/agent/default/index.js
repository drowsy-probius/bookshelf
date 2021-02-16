/**
 * ./server/controller/filehandler/index.js
 */

// export * from './type/epub';

// export * from './type/pdf';

const defaultAgent = {
  Folder: require('./type/Folder'),
  Text: require('./type/Text'),
  Zip: require('./type/Zip'),
}

module.exports = {
  defaultAgent,

}