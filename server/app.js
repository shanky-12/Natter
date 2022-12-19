const app = require('express');
const http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', (room,name) => {
    socket.join(room);
    console.log('A user joined their name is ' + name);
    socket.broadcast.to(room).emit('user_join', name);
  });

  socket.on('message', ({name, message}) => {
    console.log(name, message, socket.id);
    socket.broadcast.to(room).emit('message', {name, message});
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
  }
}

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});
