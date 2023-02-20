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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import AddNewPost from "./AddNewPost";
import AddNewCommunity from "./AddNewCommunity";
import Login from "./Login";
import Register from "./Register";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        // ...
      } else {
        setLoggedIn(false)
      }
    });
  });



  const logout = async () => {
    try{
      await signOut(auth)
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <Box position="sticky" top={0} p={4} bg="rgb(33, 33, 33)" zIndex={1}>
      <Container maxW="lg" centerContent>
      <Flex w='300%'>
        <div className="navBabies">
          <Flex
          onClick={() => navigate('/')} 
          rounded='full'
          bg="rgb(95,95,95)"
          height="50px"
          padding="6px 12px"
          width = "150px"
          justifycontent= "flex-start"
        > 
          <Image src="/images/redditFace.svg" height="40px"  alt="logo image"/>
            <Image
              display={{ base: "none", md: "unset" }}
              src="/images/redditText.svg"
              height="50px"
              alt="Image description"
                />

            
            </Flex>
          </div>
          <div style ={{className :"navBabies", height : '50px', width: '500px',justifyContent : 'stretch'}}>
          <Flex w="575%"
          alignContent='flex-start'>
            {/* {loggedIn ? <AddNewPost /> : ""} */}
          </Flex>
          </div>
          <div className="navBabies">
            <Flex justifyContent="flex-end" w="230%" position="sticky" top={0}>
              

            {loggedIn ? <Button onClick={() => navigate('/profile')} bg='#d34600' color='white' size="lg"  height='50px' marginRight='20px'>
                Profile
            </Button> : <Register />}

            {loggedIn ? <Button onClick={logout} bg='#d34600' color='white' size="lg" height='50px'>
                Logout
            </Button> : <Login />}
              
            </Flex>
          </div>
      </Flex>

        
        
        
      </Container>
    </Box>
  );
};

export default Navbar;
