import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import {logConfig} from './constants';

const {createLogger, format, transports} = winston;

const {dirname, zippedArchive, maxFiles} = logConfig;

function logFormat(info){
  return printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`
  })
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({stack: true}),
    format.splat(),
    format.json(),
  ),
  
})


export default logger;