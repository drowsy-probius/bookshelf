const {} = require('colors');

const _log = function(messages=[], pos='/')
{
  for(let i=0; i<messages.length; i++)
  {
    console.log(`[INFO] ${messages[i]} @${pos}`);
  }
};

const _debug = function(messages=[], pos='/')
{
  for(let i=0; i<messages.length; i++)
  {
    console.debug(`[DEBUG] ${messages[i]} @${pos}`);
  }
}

const _socket = function(messages=[], pos='/')
{
  for(let i=0; i<messages.length; i++)
  {
    console.debug(`[DEBUG] ${messages[i]} @${pos}`.blue);
  }
}

const _model = function(messages=[], pos='/')
{
  for(let i=0; i<messages.length; i++)
  {
    console.debug(`[DEBUG] ${messages[i]} @${pos}`.magenta);
  }
}

const _file = function(messages=[], pos='/')
{
  for(let i=0; i<messages.length; i++)
  {
    console.debug(`[DEBUG] ${messages[i]} @${pos}`.gray);
  }
}

const _route = function(messages=[], pos='/')
{
  for(let i=0; i<messages.length; i++)
  {
    console.debug(`[DEBUG] ${messages[i]} @${pos}`.yellow);
  }
}

/**********************************/

const _error = function()
{
  for(let i=0; i<arguments.length; i++)
  {
    console.error(arguments[i]);
  }
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