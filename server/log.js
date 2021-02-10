import colors from 'colors';

const logger = {};

logger.log = function(message, pos='not defined'){
  return console.log(colors.white(`[INFO] %s @%s`), message, pos);
}

logger.debug = function(message, pos='not defined'){
  return console.log(colors.gray(`[DEBUG] %s @%s`), message, pos);
}

logger.error = function (message, pos='not defined'){
  return console.error(colors.red(`[INFO] %s @%s`), message, pos);
}

logger.trace = function(){
  return console.trace();
}

export default logger;