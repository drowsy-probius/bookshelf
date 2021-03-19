const path = require('path');


const absoluteDirname = path.resolve(__dirname);

/**
 * environment variable BOOKSHELF_HOST, BOOKSHELF_PORT or
 * '0.0.0.0', 3456
 */
const webHost = process.env.BOOKSHELF_HOST || '0.0.0.0';
const webPort = process.env.BOOKSHELF_PORT || 3456;

/**
 * environment variable BOOKSHELF_REDIS_PORT or
 * 63279
 */
const redisPort = process.env.BOOKSHELF_REDIS_PORT || 63279;

/**
 * logConfig for winston module
 * 
 * environment variable BOOKSHELF_LOG or
 * {App root}/logs
 */
const logConfig = {
  dirname: path.resolve(
    process.env.BOOKSHELF_LOG || path.join(absoluteDirname, '../logs')
  ),
  zippedArchive: false,
  maxFiles: 15,
}


/**
 * return String
 * -09:00, +01:00, etc...
 */
const timeZone = (()=>{
  const offset = -(new Date().getTimezoneOffset());
  const str = (offset >= 0 ? '+' : '-') +
              Number(offset/60).toString().padStart(2, '0') + ':' + 
              Number(offset%60).toString().padStart(2, '0');
  return str;
})();


/**
 * environment variable BOOKSHELF_DB or
 * {App root}/database
 */
const databaseDirectory = path.resolve(
  process.env.BOOKSHELF_DB || path.join(absoluteDirname, '../database')
);


/**
 * environment variable BOOKSHELF_PLUGIN or 
 * {App root}/plugins
 */
const pluginDirectory = path.resolve(
  process.env.BOOKSHELF_PLUGIN || path.join(absoluteDirname, '../plugins')
);


/**
 * environment variable BOOKSHELF_METADATA or
 * {App root}/Metadata
 */
const metadataDirectory = path.resolve(
  process.env.BOOKSHELF_METADATA || path.join(absoluteDirname, '../Metadata')
);


module.exports = {
  webHost,
  webPort,
  redisPort,
  timeZone,
  logConfig, 
  databaseDirectory,
  pluginDirectory,
  metadataDirectory,
}