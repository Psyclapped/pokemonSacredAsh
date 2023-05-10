const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

io.on('connection', (socket) => {
  console.log('a client has connected');

  socket.on('disconnect', () => {
    console.log('a client has disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
