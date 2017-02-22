const socketio = require('socket.io');

const CreateIO = (server, onConnection) => {
  const io = socketio.listen(server);

  // Default "connection" code
  io.sockets.on('connection', (socket) => {
    console.log(`New Connection ${socket}`);
  });

  // If there is an onConnection function, connect it.
  if (onConnection) {
    io.sockets.on('connection', onConnection);
  }
  return io;
};

module.exports.CreateIO = CreateIO;
