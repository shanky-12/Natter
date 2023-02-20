import {
    Button,
    Box,
    Container,
    Flex,
    Image,
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
    Card,
    CardHeader,
    Heading,
    CardBody,
    Text,
    CardFooter,
    VStack
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import AddNewPost from "./AddNewPost";
  import Login from "./Login";
  import { useNavigate } from 'react-router-dom';
  import Register from "./Register";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { collection, getDocs, getFirestore, onSnapshot, query, orderBy, limit, where } from "firebase/firestore";
  import { db } from "../lib/firebase";
  import Post from "../components/Post";
  

  
  const Profile = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [posts, setPosts] = useState([]);
    const [uid, setUID] = useState("");
    const [signedOut, setSignedOut] = useState(true)
    

      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUID(user.uid);
              setEmail(user.email);
              setName(user.displayName);
              setSignedOut(false)
              // ...
            } else {
              // User is signed out
              setSignedOut(true)
            }
          });
      }, []);

    
      useEffect(() => {
        const q = query(collection(db, "posts"), where("userID", "==", uid));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const _posts = [];
          querySnapshot.forEach((doc) => {
            _posts.push({
              id: doc.id,
              ...doc.data(),
            });
            
          });
          setPosts(_posts);
          // console.log("Current posts details: ", posts.join(", "));
        }, []);
    
      });

      if(signedOut){
        return (

            <Card align='center'>

             <Heading size='md'>You are not signed in! Login above to view your profile.</Heading>

         
             

         </Card>
         
             );
      }else{

     
    return (

      <Card align='center'>
      <CardHeader>
        <Heading size='md' color='white'>Display Name: {name}</Heading>
        <br>
        </br>
        <Heading size='md'color='white'>Email: {email}</Heading>
      </CardHeader>
      <CardBody>
        <Text color='white'>View a summary of all your posts</Text>
      </CardBody>
      <CardFooter>
    
        <div color="white">
        <script src="https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js"></script>
       {/*  https://chakra-ui.com/docs/components/container */}
          {/* <Navbar /> */}
          {<Container maxW="container.sm" centerContent p={8}>  
            <VStack spacing={8} w="100%">
              {posts.map((post) => (
                <Post post={post} key={post.id} />
                
              ))}
            {/* <Comments/> */}
            </VStack>
          </Container>
          }
          </div>
      </CardFooter>
    </Card>

    );
}
  };
  
  export default Profile;
  