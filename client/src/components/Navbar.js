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
    <Box position="sticky" top={0} p={4} bg="gray.100" zIndex={1}>
      <Container maxW="lg" centerContent>
      <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >  
      <Image  onClick={() => navigate('/')} src="/images/redditFace.svg" height="30px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
             />

        
        </Flex>
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
          
          
          
          
        

        {loggedIn ? <AddNewPost /> : ""}

        {loggedIn ? <Button onClick={() => navigate('/profile')} colorScheme="blue" size="lg" margin="10px">
            Profile
        </Button> : <Register />}

        {loggedIn ? <Button onClick={logout} colorScheme="blue" size="lg" margin="10px">
            Logout
        </Button> : <Login />}
          
        </Flex>

        
        
        
      </Container>
    </Box>
  );
};

export default Navbar;
