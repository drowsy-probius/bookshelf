const path = require('path');

const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const {logConfig} = require('../../config');

const {createLogger, format, transports} = winston;

const APP_ROOT = path.resolve(__dirname, '../../');

const logLevels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];


const logFormatPrintf = format.printf((info) => {
  return `${info.timestamp} [${info.level}] ${info.message}`
});

const loggerFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.errors({stack: true}),
  logFormatPrintf,
  format.splat(), // %s string interpolation
);

const loggerTransportWarn = new winstonDaily({
  level: 'warn',
  datePattern: 'YYYY-MM-DD',
  dirname: logConfig.dirname,
  filename: `%DATE%.warn.log`,
  maxFiles: logConfig.maxFiles,
  zippedArchive: logConfig.zippedArchive,
});

const loggerTransportInfo = new winstonDaily({
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  dirname: logConfig.dirname,
  filename: `%DATE%.log`,
  maxFiles: logConfig.maxFiles,
  zippedArchive: logConfig.zippedArchive,
});

const loggerTransportDebug = new winstonDaily({
  level: 'debug',
  datePattern: 'YYYY-MM-DD',
  dirname: logConfig.dirname,
  filename: `%DATE%.debug.log`,
  maxFiles: logConfig.maxFiles,
  zippedArchive: logConfig.zippedArchive,
});

const loggerTransportDev = new transports.Console({
  level: 'silly',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({stack: true}),
    logFormatPrintf,
    format.colorize({all: true}),
  )
});


/**
 * usage: 
 * 
 * logger.log(level:string, message:any)
 * logger.error(message:any|Error), logger.warn(message:any),
 * logger.info(message:any), logger.verbose(mesage:any),
 * logger.debug(message:any)
 * 
 * log level
 * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 */
const logger = createLogger({
  format: loggerFormat,

  transports: [
    loggerTransportWarn,
    loggerTransportInfo,
    loggerTransportDebug,
  ]
});

const loggerStream = {
  write: (message) => {
    if(typeof(message) === 'object')
    {
      message = JSON.stringify(message);
    }
    message = '[expressApp]: ' + message;

    logger.info(message)
  }
}

const loggerDatabase = (message) => {logger.debug(message, {filename: 'sqlite3', notFilePath: true})}


/**
 * @brief logger.info(message, module)
 * 만약 logger에 파일 경로 말고 다른 이름 넣고싶으면 module 대신에
 * {filename: 'name', notFilePath: true}로 넣으면 이름만 로그에 찍힘
 * 
 * log level
 * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }} module 
 */
function loggerWrapper(module)
{
  let filename = module.filename;
  if(!module.notFilePath)
  {
    filename = path.relative(APP_ROOT, filename)
  }

  function format(msg)
  {
    if(typeof(msg) === 'object')
    {
      msg = JSON.stringify(msg, null, 2);
    }
    return `[${filename}]: ${msg}`
  }

  const loggerWrapperObject = {}
  for(const level of logLevels)
  {
    loggerWrapperObject[level] = function(message, info){
      logger[level](format(message), info)
    }
  }
  
  return loggerWrapperObject;
}


if(process.env.NODE_ENV !== 'production'){
  logger.add(loggerTransportDev);
}

module.exports = {
  loggerWrapper,
  loggerStream,
  loggerDatabase,
};