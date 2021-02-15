const {spawn, execSync} = require('child_process');
const fs = require('fs');

const {logger} = require('../log');

const {REDIS_PORT, databaseDirectory} = require('../constants');
const { throws } = require('assert');

try
{
  /**
   * Ubuntu install
   * sudo apt install redis-server
   */
  const redisBinary = execSync('redis-server --version');
  logger.info(redisBinary)

  !fs.existsSync(databaseDirectory) && fs.mkdirSync(databaseDirectory, {recursive: true});

  const redisServer = spawn('redis-server', [`--port ${REDIS_PORT}`], [`--dir ${databaseDirectory}`])

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

