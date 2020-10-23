const url = require('url');

module.exports.socket = (io) => {
  io.on('connection', (socket) => {

    console.log(socket);

    var ns = url.parse(socket.handshake.url, true).query.ns;
    console.log('connected ns: '+ns)

    const room = socket.handshake['query']['r_var'];
  
    socket.join(room);
    console.log('user joined room #'+room);
  
    socket.on('disconnect', function(reason) {
      socket.leave(room)
      console.log(`socket disconnected: ${reason}`.gray);
    });
  
    socket.on('chat message', function(msg){
      io.to(room).emit('chat message', msg);
    });

    /*
    library db에 id를 1부터 저장
    id를 namespace로 사용
    /reader/1 -> 1번 항목 binary stream
    /reader/2 -> 2번 항목 binary stream
    */
  
  });
}