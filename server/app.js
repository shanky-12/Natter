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

// const socketIO = require('socket.io');
// const express = require('express');
// const http = require('http');
// const app = express();
// const httpServer = http.createServer(app);
// const io = socketIO(httpServer);
// const cors = require('cors');

// app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   next();
// });

// io.on('connection', (socket) => {
//   console.log('new client connected', socket.id);

//   socket.on('user_join', ({room,name}) => {
//     socket.join(room);
//     console.log('A user joined their name is ' + name);
//     io.sockets.in(room).emit('user_join', name);
//   });

//   socket.on('message', ({room,name, message}) => {
//     console.log(name, message, room);
//     io.sockets.in(room).emit('message', {name, message});
//   });

//   socket.on('disconnect', () => {
//     console.log('Disconnect Fired');
//   });
// });

// async function addMessage(name,message,socketID){
//   var newMessage={
//     name:name,
//     message,message,
//     time: Date.now()
//   };
//   return newMessage;
// }
// httpServer.listen(8080, () => {
//   console.log(`listening on *:${8080}`);
// });
const express = require('express');
// const app = require('express');
const app = express();
const http = require('http').createServer(app);
// var io = require('socket.io')(http);
const cors = require('cors');
// const app = express();
// app.use(cors());
// var socket = io('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
// app.use(cors({ origin: 'http://localhost:3001' }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   next();
// });
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
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

http.listen(3000, function() {
  console.log(`listening on *:${3000}`);
});