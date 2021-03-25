/**
 * ./server/controller/filehandler/index.js
 */

// export * from './type/epub';

// export * from './type/pdf';

const supportedTypes = [
  '.zip',
  '.txt',
  '.pdf',
  '.epub',
  'folder',
]

const defaultAgent = {
  Folder: require('./type/Folder'),
  Text: require('./type/Text'),
  Zip: require('./type/Zip'),
}

module.exports = {
  defaultAgent,
  supportedTypes,
}