import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import cors from 'cors';
import { Socket } from 'socket.io';

const io = new Socket(server, {
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
// import express from 'express';
// import fs from 'fs';
// import request from 'request';
// import gm from 'gm';
// import axios from 'axios';
// import {ref ,getDownloadURL, uploadBytesResumable} from "firebase/storage";
// import { db, firebaseStorage } from '/Users/shankytyagi/Desktop/Natter-Aditi-2/server/firebase/firebaseConfig.js';
// import fs from 'fs';
// import request from 'request';
// import gm from 'gm';
// import axios from 'axios';
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import db from './firebase/firebaseConfig.js';
// import firebaseStorage from './firebase/firebaseConfig.js';
// import express from 'express';
import fs from 'fs';
import request from 'request';
import gm from 'gm';
import axios from 'axios';
import {ref ,getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { db, firebaseStorage } from '/Users/shankytyagi/Desktop/Natter-Aditi-2/server/firebase/firebaseConfig.js';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});  

// define routes for express app
app.get('/', async (req, res) => {
  const { src } = req.query; // get the image URL from the frontend
// });
    console.log(src);
    request(src, { encoding: null }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.error(`Error: ${src} could not be downloaded.`);
      res.status(500).send(`Error: ${src} could not be downloaded.`);
      return;
    }

    console.log(body)

    const fileName = `${Date.now()}.${src.split('.').pop()}`;


    gm(body)
    .resize(200, 600)

    .toBuffer((error, _buffer) => {
      if (error) {
        console.error(error);
        res.status(500).send(error);
      }
              // create a reference to the resized image in Firebase Storage
      const fileRef = ref(firebaseStorage, `resizedImages/${fileName}`);

      const uploadTask = uploadBytesResumable(fileRef, _buffer);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          console.log(`Upload progress: ${percent}%`);
        },
        (err) => console.log(err),
        async () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            // send the download url to the client
            res.send(downloadUrl);
          });
        }
      );
    });
  });
});

// start the server
server.listen(3000, function() {
    console.log(`listening on *:${3000}`);
  });

