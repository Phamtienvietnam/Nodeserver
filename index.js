const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8080;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
	  console.log('ID KET NOI '+socket.id);
	  console.log('Client connected - Tổng số Online => '+io.sockets.server.engine.clientsCount);
	  console.log(io.sockets.server.engine.clientsCount);
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
	 console.log (msg);
	 io.emit('message', msg);
  });
  console.log(socket.rooms)	
socket.on('disconnect', () => console.log('Client disconnected - Online Còn lại '+io.sockets.server.engine.clientsCount));  
});

