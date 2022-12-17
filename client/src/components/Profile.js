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
    CardFooter
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import AddNewPost from "./AddNewPost";
  import Login from "./Login";
  import { useNavigate } from 'react-router-dom';
  import Register from "./Register";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  const Profile = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setEmail(user.email);
          setName(user.displayName);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    return (

        <Card align='center'>
  <CardHeader>
    <Heading size='md'>Display Name: {name}</Heading>
    <Heading size='md'>Email: {email}</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your posts</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>View here</Button>
  </CardFooter>
</Card>

    );
  };
  
  export default Profile;
  