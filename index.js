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
	  const ipAddress = socket.handshake.address;

 	 console.log(ipAddress)
	  console.log('Client connected - Tổng số Online => '+io.sockets.server.engine.clientsCount);
	  console.log(io.sockets.server.engine.clientsCount);
  socket.on('chat message', msg => {
	  const myArray = msg.split("*");
  		switch (myArray[0]) {
    		case "TOTAL":
      		io.emit('chat message', 'Tổng số Online => '+io.sockets.server.engine.clientsCount);
      		break;

    		case "Papayas":
      		console.log("Mangoes and papayas are $2.79 a pound.");
     		 // Expected output: "Mangoes and papayas are $2.79 a pound."
      		break;
    		default:
 	 }  
    io.emit('chat message', msg);
	 console.log (msg);
	 io.emit('message', msg);
  });
  console.log(socket.rooms)	
socket.on('disconnect', () => io.emit('chat message', 'Client disconnected - Online Còn lại '+io.sockets.server.engine.clientsCount));  
});

