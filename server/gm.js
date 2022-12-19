//check
// const express = require('express');
// const app = express();
// const {Storage} = require('@google-cloud/storage');
// const fs = require('fs');
// const gm = require('gm');
// const db = require('./firebase/firebaseConfig')


// console.log("check1 : " + db);

// app.get('src', (req, res) => {

// // fs.readFile(
// //     "images.jpeg",
// //     "utf8",
// //     function (err, data) {
// //       if (err) throw err;
// //       console.log(data);
// //     }
// //   );
  
// //   // resize and remove EXIF profile data
// //   gm("images.jpeg")
// //     .resize(50, 50)
// //     .noProfile()
// //     .write("resize.png", function (err) {
// //       if (!err) console.log("done");
// //     });
//     gm(src)
//       .resize(400, 300)
//       .toBuffer((error, buffer) => {
//         if (error) {
//           console.error(error);
//         } else {
//           setUrl(`data:image/jpeg;base64,${buffer.toString('base64')}`);
//         }
//       });
//       return <Image src={url} alt="Post image" boxSize='300px' />
//       // return <img src={url} alt="Post image" boxSize="300px" />;
// });

// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const fs = require('fs');
// const gm = require('gm');

// // Enable CORS for all routes
// app.use(cors());
// app.get('/', (req, res) => {
//   const { src } = req.query; // get the image URL from the frontend
//   console.log(src);
//   // resize the image and save it to a file
//   gm(src)
//     .resize(400, 300)
//     .write('resized.jpg', (error) => {
//       if (error) {
//         console.error(error);
//         res.status(500).send(error);
//       } else {
//         // read the resized image file
//         fs.readFile('resized.jpg', (err, data) => {
//           if (err) {
//             console.error(err);
//             res.status(500).send(err);
//           } else {
//             // generate a unique file name for the resized image
//             const fileName = `${Date.now()}-${src}`;

//             // create a reference to the resized image in Firebase Storage
//             const fileRef = storage.ref().child(fileName);

//             // upload the resized image to Firebase Storage
//             fileRef.put(data).then(() => {
//               // get the URL of the resized image from Firebase Storage
//               fileRef.getDownloadURL().then((url) => {
//                 // send the URL of the resized image in the response
//                 res.send(url);
//               });
//             });
//     }
// });
import express from 'express';
const app = express();
import fs from 'fs';
import request from 'request';
import gm from 'gm';
import {ref ,getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { db, firebaseStorage } from '/Users/shankytyagi/Desktop/Natter-Aditi-2/server/firebase/firebaseConfig.js';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});  
app.get('/', (req, res) => {
  const { src } = req.query; // get the image URL from the frontend
    console.log(src);
    request(src, { encoding: null }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.error(`Error: ${src} could not be downloaded.`);
      res.status(500).send(`Error: ${src} could not be downloaded.`);
      return;
    }
    gm(body)
    .resize(400, 300)

    .toBuffer((error, _buffer) => {
      if (error) {
        console.error(error);
        res.status(500).send(error);
    //   } else {
    //     // read the resized image file
    //     fs.readFile('resized.jpg', (err, data) => {
    //       if (err) {
    //         console.error(err);
    //         res.status(500).send(err);
           }
            // generate a unique file name for the resized image
            const fileName = `${Date.now()}`;

            // create a reference to the resized image in Firebase Storage
            const fileRef = ref(firebaseStorage, `resizedImages/${fileName}`);
            
            const uploadTask = uploadBytesResumable(fileRef,body);
            uploadTask.on(
                "state_changed",
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
                //imageUrl = url;
                // if(url) {
                // imageUrl = url ? url : 'http://placeholder.com';}
                console.log(downloadUrl);
                res.send(downloadUrl);
                
                }); 
          })
         });
});
});
const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
