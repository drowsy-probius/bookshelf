const model = require('../model');
const console = require('../log');

const send = require('./send').send;

const _reader = reader => {
  reader.on('connect', socket => {
    socket.on('id', async (req) => {
      try
      {
        const doc = await model.library.get(req.id);

        console.socket(`request /reader/${doc._id} -> ${doc.path}`, '/sockets.reader.js');

        if( ['zip', 'txt', 'folder', 'pdf', 'epub'].includes(doc.type) )
        {
          send[doc.type](doc.path, socket);
        }
        else
        {
          throw new Error(`unknown type: ${doc._id} - ${doc.path} - ${doc.type} @/socket/reader.js`);
        }
      }
      catch(e)
      {
        socket.emit('err', {msg: e});
        console.error(e);
      }
    });
  });
};

/********************************/

module.exports.reader = _reader;