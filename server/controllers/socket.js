const fileHandler = require('../filehandler/main');

/***************************************************/

const _socket = (io) => {
  const index = io.of('/index');
  require('../sockets/index').index(index);

  const reader = io.of('/reader');
  require('../sockets/reader').reader(reader);

  const dev = io.of('/dev');
  require('../sockets/dev').dev(dev);
}

/******************************************/

module.exports.socket = _socket;


/**
 * client -
 * 1. index 연결
 * 2. 'index'메시지전달
 * 3. pagesize, offset 전달
 * 4. 항목 받으면 렌더
 * 
 * server -
 * 1. index 연결
 * 2. 'index'메시지 받음
 * 3. 현재 pagesize, offset 저장
 * 4. db 항목 개수가 pagesize보다 크다면
 *      (pagesize, offset)만큼 전달
 *      끝
 *    db 항목 개수가 pagesize보다 작다면
 *      (pagesize, offset)만큼 전달
 *      db에 새 항목이 추가되는 지 계속 확인
 *      새 항목이 추가 되었다면 전달
 *      전달 한 항목 수가 pagesize에 도달하면 끝
 *
 *  
 */