const {spawn, execSync, spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const logger = require('../../log').loggerWrapper(module);
const {redisPort, databaseDirectory} = require('../../../config');


/**
 * for Ubuntu,
 * sudo apt install redis-server
 */
function checkRedisServer()
{
  try
  {
    const redisBinary = execSync('redis-server --version')
    logger.debug('[redis] redis-server version: ' + redisBinary.toString());
  }
  catch(e)
  {
    throw new Error(e);
  }
}


function startRedisServer()
{
  try
  {
    const redisDirectory = path.join(databaseDirectory, 'redis');
    !fs.existsSync(redisDirectory) && fs.mkdirSync(redisDirectory, {recursive: true});

    const redisServer = spawnSync('redis-server', 
    ['--bind', '127.0.0.1', '--port', redisPort, 
    '--dir', redisDirectory, '--always-show-logo', 'no']);

    redisServer.stdout.on('data', (stdout) => {
      logger.debug('[redis] '+stdout);
    })
  
    redisServer.stderr.on('data', (stderr) => {
      logger.error('[redis]' + stderr);
    })
  
    redisServer.on('close', (code) => {
      throw new Error('[redis] redis process closed with code: ' + code)
    })
  
    redisServer.on('exit', (code) => {
      throw new Error('[redis] redis process exited with code: ' + code);
    })
  
    redisServer.on('error', (error) => {
      throw new Error(error);
    })
  }
  catch(e)
  {
    throw new Error(e);
  } 
}


module.exports = {
  checkRedisServer,
  startRedisServer,
}