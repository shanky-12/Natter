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

// import express from 'express';
// const app = express();
// import fs from 'fs';
// import request from 'request';
// import gm from 'gm';
// import axios from 'axios';
// import {ref ,getDownloadURL, uploadBytesResumable} from "firebase/storage";
// import { db, firebaseStorage } from '/Users/shankytyagi/Desktop/Natter-Aditi-2/server/firebase/firebaseConfig.js';
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });  
// app.get('/', async (req, res) => {
//   const { src } = req.query; // get the image URL from the frontend
// // });
//     console.log(src);
//     request(src, { encoding: null }, (error, response, body) => {
//     if (error || response.statusCode !== 200) {
//       console.error(`Error: ${src} could not be downloaded.`);
//       res.status(500).send(`Error: ${src} could not be downloaded.`);
//       return;
//     }

//     console.log(body)

//     const fileName = `${Date.now()}.${src.split('.').pop()}`;


//     gm(body)
//     .resize(200, 600)

//     .toBuffer((error, _buffer) => {
//       if (error) {
//         console.error(error);
//         res.status(500).send(error);
//       }
//             // create a reference to the resized image in Firebase Storage
//             const fileRef = ref(firebaseStorage, `resizedImages/${fileName}`);
            
//             const uploadTask = uploadBytesResumable(fileRef,body);
//             uploadTask.on(
//                 "state_changed",
//                 (snapshot) => {
//                 const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//               );
              
//               // update progress
//               console.log(`Upload progress: ${percent}%`);
//               },
//               (err) => console.log(err),
//                 async () => {
//       // download url
//                 getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
//                 //imageUrl = url;
//                 // if(url) {
//                 // imageUrl = url ? url : 'http://placeholder.com';}
//                 console.log(downloadUrl);
//                 res.send(downloadUrl);
                
//                 }); 
//           })
//          });
// });
// });
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
import express from 'express';
import request from 'request';
import gm from 'gm';
// import { storage } from 'firebase-admin';
import { db, firebaseStorage } from './firebase/firebaseConfig.js';
import {ref,updateMetadata, uploadBytesResumable,getDownloadURL} from "firebase/storage"
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  const { src } = req.query; // get the image URL from the frontend
    console.log("Original url : "+ src)
  // Download the image
  gm(request(src)).toBuffer(function(error, imageData) {
    if (error) {
      // handle the error
    } else {
      // Create a new file in Firebase Storage with the same name and content type as the original image
    //   const file = firebaseStorage.bucket().file(src);
    const file = ref(firebaseStorage, `${src}`)
    updateMetadata(file, { contentType: 'image/jpeg' });

      // Resize the image and save it to the new file
      gm(imageData).resize(800, 300).toBuffer(function(error, buffer) {
        if (error) {
          // handle the error
        } else {
            uploadBytesResumable(file, buffer).then(() => {
                console.log('File saved successfully');
              }).catch((error) => {
                console.log('Error saving file:', error);
              });

          // Get the download URL for the new file
          getDownloadURL(file).then((downloadURL) => {
            console.log(`File download URL: ${downloadURL}`);
            res.send(downloadURL);
          }).catch((error) => {
            console.log('Error getting download URL:', error);
          });
        //     if (error) {
        //       // handle the error
        //     } else {
        //       // Send the download URL as the response
        //       res.send(downloadUrl);
        //     }
        //   });
        }
      });
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
