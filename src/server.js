const httpHandler = require('./httpHandler');
const ioHandler = require('./ioHandler');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// Create HTTP server. Handles HTTP requests.
const server = httpHandler.CreateServer(PORT);

// Set IO Handler to listen to the server.
ioHandler.CreateIO(server, (socket) => {
  // Handles when a message is received from a socket.
  socket.on('addShape', (newShape) => {
    const shape = newShape;
    const time = new Date().getTime();  // Get timestamp to use as key.

    // Send shape back to sender.
    shape.color = 'green';
    socket.emit('addShape', { time, shape }); // Send red shapes to everyone excepts the sender.

    // Send shapes to others
    shape.color = 'red';
    socket.broadcast.emit('addShape', { time, shape }); // Send red shapes to everyone excepts the sender.

    // Send confirmation message.
    socket.emit('serverMessage', { message: 'Shape Sent' });  // Sends confirmation message to server.
  });
});
