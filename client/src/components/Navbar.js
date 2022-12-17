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
import React from "react";
import { useNavigate } from 'react-router-dom';

import AddNewPost from "./AddNewPost";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box position="sticky" top={0} p={4} bg="gray.100" zIndex={1}>
      <Container maxW="md" centerContent>
      <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >  
      <Image src="/images/redditFace.svg" height="30px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
             />

        <Button onClick={() => navigate('/profile')} colorScheme="blue">
            Profile
        </Button>
        <Button onClick={() => navigate('/profile')} colorScheme="blue">
            Logout
        </Button>
        </Flex>
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
          <AddNewPost />
          <Login />
          <Register />
          
        </Flex>

        
        
        
      </Container>
    </Box>
  );
};

export default Navbar;
