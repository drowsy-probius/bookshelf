const {spawn, execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const {logger} = require('../log');

const {redisPort, databaseDirectory} = require('../config');

try
{
  /**
   * Ubuntu install
   * sudo apt install redis-server
   */
  const redisBinary = execSync('redis-server --version');
  logger.info(redisBinary)

  const redisDirectory = path.join(databaseDirectory, 'redis');
  !fs.existsSync(redisDirectory) && fs.mkdirSync(redisDirectory, {recursive: true});

  const redisServer = spawn('redis-server', 
  ['--bind', '127.0.0.1', '--port', redisPort, 
  '--dir', redisDirectory, '--always-show-logo', 'no'])

  redisServer.stdout.on('data', (stdout) => {
    logger.info('[redis] '+stdout);
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
  logger.error('redis-server failed!');
  logger.error(e);
}

