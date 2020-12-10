const colors = require('colors');

const _log = function(messages, pos='/')
{
  console.log(colors.white(`[INFO] %s @%s`), messages, pos);
};

const _debug = function(messages, pos='/')
{
  console.log(colors.white(`[DEBUG] %s @%s`), messages, pos);
}

const _socket = function(messages, pos='/')
{
  console.log(colors.blue(`[DEBUG] %s @%s`), messages, pos);
}

const _model = function(messages, pos='/')
{
  console.log(colors.magenta(`[DEBUG] %s @%s`), messages, pos);
}

const _file = function(messages, pos='/')
{
  console.log(colors.gray(`[DEBUG] %s @%s`), messages, pos);
}

const _route = function(messages, pos='/')
{
  console.log(colors.yellow(`[DEBUG] %s @%s`), messages, pos);
}

/**********************************/

const _error = function(error, pos='/')
{
  console.error(colors.red(`[DEBUG] %s @%s`), error, pos);
}

const _trace = () => {
  console.trace();
}

/**********************************/

module.exports.log = _log;
module.exports.debug = _debug;

module.exports.socket = _socket;
module.exports.model = _model;
module.exports.file = _file;
module.exports.route = _route;

module.exports.error = _error;
module.exports.trace = _trace;