import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
// import db from "../lib/firebase";
// import storage from "../lib/firebase";
import { useParams } from 'react-router-dom';
import { collection, addDoc, getDoc,  doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import noImage from '../img/download.jpeg'
import axios from 'axios';


//const app = initializeApp(firebaseConfig);
// import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from "firebase/auth";
// import {getStorage} from "firebase/storage"
import {ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"

import {db, firebaseStorage} from "../lib/firebase"
//const functions = require('firebase-functions');
//const admin = require('firebase-admin');

//const {Firestore} = require('@google-cloud/firestore');
//import {Firestore} from 'google-cloud/firestore';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);//.firestore();
// const storage = getStorage(app)


const AddNewPost = () => {
  let postId = useParams().postnum
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [imageUpload, setImageUpload] = useState("");
  const [imageFile, setImageFile] = useState(noImage);
  const [uid, setUID] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [percent, setPercent] = useState(0);
  const [iurl, setUrl] = useState("");
  const [req, setReq] = useState(false);
  const auth = getAuth();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
        // ...
      } else {
      }
    });
  });
  useEffect(() => {
    setReq((!title.trim() && !description.trim()&&!(imageFile==noImage)));
  }, [title,description,imageFile])
  
  const handleSubmit = async () => {
    //const db = getFirestore(app);
    let iurl="";
    console.log("Check db : ", db);
    setSaving(true);
    const date = new Date();
    if (imageFile==noImage) { // || !videoFile) {
      // Display an error message or do something else to let the user know that they need to select a file.
     alert("please upload image");
     
      return;
    }
    try {
      // const storage = getStorage();
      // const storage = firebase.storage();
      // Generate a unique file name for the uploaded image
      const fileName = `${date.getTime()}-${imageFile.name}`;
      console.log("check1 : " + fileName)
      console.log(firebaseStorage)
      // Create a reference to the location where the image will be stored
      const imageRef = ref(firebaseStorage, `images/${fileName}`)
      console.log("check2 : " +imageRef)
      
      // call server express route with image blob or binary in post request
      //on server request process gm resize and forwrad that to firbase upload
      // return upload scuess and image url to client
      const uploadTask = uploadBytesResumable(imageRef, imageFile);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
          const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
        },
        (err) => console.log(err),
          async () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
    
          console.log(downloadUrl);
          iurl = downloadUrl;
          console.log("check iurl after download url : "+ fileName);
          console.log("check iurl after download url : "+ iurl);
          

          // // Send the iurl to the backend
          // const response = await axios.get('http://localhost:3001/', {
          //   params: {
          //     src: iurl
          //   }
          // });

          // Get the new URL from the response
          // const newUrl = response.data;
          // console.log("Response Url : " + newUrl)
          
          // setUrl(iurl)
          
          // const querySnapshot = await getDoc(query(collection(db, "community"), where("Document ID", "==", postId)));
          // const data = querySnapshot.docs;
          // console.log("q:", querySnapshot)
          // console.log("data", data)

          const docRef2 = doc(db, "community", postId);
          const docSnap2 = await getDoc(docRef2);
          const comm = docSnap2.data().title;

          // Send the iurl to the backend
           const response = await axios.get('http://localhost:3002/', {
            params: {
              src: iurl
            }
          });
          // const newUrl = iurl;
          // Get the new URL from the response
         const newUrl = response.data;
          console.log("Response Url : " + newUrl)
          setUrl(iurl)

          const docRef = await addDoc(collection(db, "posts"), {
            title: title,
            userID: uid,
            description: description,
            community: comm,
            communityId: postId,
            // newUrl,
            newUrl,
            upVotesCount: 0,
            downVotesCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString(),
          });
          console.log("Document written with ID: ", docRef.id);
          });
        
    })
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    onClose();
    setTitle("");
    setDescription("");
    setImageFile(noImage);

    setSaving(false);
  };

  return (
    <>
      <Button w='20%' onClick={onOpen} variant="solid" bg="#d34600" color='white' size='lg' height='50px'>
        Add new post
      </Button>

      <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader color='white' bg="#d34600">Add new post</ModalHeader>
            <ModalCloseButton />
            <ModalBody color='white' bg ='rgb(33, 33, 33)'>
              <FormControl isRequired id="post-title">
                <FormLabel>Post title</FormLabel>
                <Input
                  type="post-title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired id="post-description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="post-description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired id="post-imageupload">
                <FormLabel>Image Upload</FormLabel>
                <input
                  type="file"
                  alt="No image"
                  accept=".jpg, .jpeg, .jfif, .pjpeg, .pjp, .png"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter color='white' bg="rgb(33, 33, 33)">
              <HStack spacing={4}>
                <Button onClick={onClose} borderColor='white' borderWidth='0.5px' bg='red' color= 'white'>Close</Button>
                <Button
                  borderColor='white' 
                  borderWidth='0.5px'
                  onClick={handleSubmit}
                  bg='green'
                  color='white'
                  disabled={req}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default AddNewPost;
