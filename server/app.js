// import app from 'express';
// import { http } from "'http'.createServer(app)";
// var io = require('socket.io')(http);
// import express from 'express';
// import { createServer } from 'http';
// const app = express();
// const io = require('socket.io')(createServer(app));

// import express from 'express';
// import http from 'http';
// import * as socketIO from 'socket.io';

// const app = express();
// const httpServer = http.createServer(app);
// const io = socketIO(httpServer);

const socketIO = require('socket.io');

const http = require('http');
const app = require('express')();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

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

httpServer.listen(3000, () => {
  console.log(`listening on *:${3000}`);
});