
import express from 'express';
import request from 'request';
import gm from 'gm';

import { firebaseStorage } from './firebase/firebaseConfig.js';
import {ref,updateMetadata, uploadBytesResumable,getDownloadURL} from "firebase/storage"
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  // get the image URL from the frontend
  const { src } = req.query; 
    console.log("Original url : "+ src)
  
    // Download the image
  gm(request(src)).toBuffer(function(error, imageData) {
    if (error) {
      // handle the error
    } else {
      // Create a new file in Firebase Storage with the same name and content type as the original image
    const file = ref(firebaseStorage, `${src}`)
    updateMetadata(file, { contentType: 'image/jpeg' });

      // Resize the image and save it to the new file
      gm(imageData).resize(400, 400).toBuffer(function(error, buffer) {
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
        }
      });
    }
  });
});

const port = 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
