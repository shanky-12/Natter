const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', ({room,name}) => {
    socket.join(room);
    console.log('A user joined their name is ' + name);
    io.sockets.in(room).emit('user_join', name);
  });

  socket.on('message', ({room,name, message}) => {
    console.log(name, message, room);
    io.sockets.in(room).emit('message', {name, message});
  });

  socket.on('disconnect', () => {
    console.log('Disconnect Fired');
  });
});

async function addMessage(name,message,socketID){
  var newMessage={
    name:name,
    message,message,
    time: Date.now()
  };
  return newMessage;
}

http.listen(3001, function() {
  console.log(`listening on *:${3001}`);
});