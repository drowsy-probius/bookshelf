const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const {logConfig} = require('./constants')

const {createLogger, format, transports} = winston;


const loggerFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.errors({stack: true}),
  format.printf((info) => {
    return `${info.timestamp} ${('['+info.level+']').padEnd(9, ' ')}: ${info.message}`;
  }),
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
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({stack: true}),
    format.printf((info) => {
      return `${info.timestamp} ${('['+info.level+']').padEnd(9, ' ')}: ${info.message}`;
    }),
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
    logger.info(message)
  }
}


if(process.env.NODE_ENV !== 'production'){
  logger.add(loggerTransportDev);
}


module.exports = {logger, loggerStream};