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
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import db from "../lib/firebase";
import { db } from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

//const app = initializeApp(firebaseConfig);

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [errorD, setErrorD] = useState("");

  const auth = getAuth();

  const handleSubmit = async () => {
    setSaving(true);
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setError(false);
      const user = userCredential.user;
      onClose();
    }catch(error){
      setError(true);
        setErrorD(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
    }

    setSaving(false);
  };

  return (
    <>
      <Button onClick={onOpen} bg='#d34600' color='white' size="lg" margin="10px">
        Login
      </Button>

      <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <FormLabel id="error">{error ? errorD : ""}</FormLabel>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired id="post-title" >
                <FormLabel>Email</FormLabel>
                <Input
                  type="post-title"
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired id="post-title" >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              
             
            </ModalBody>
            <ModalFooter>
              <HStack spacing={4}>
                <Button onClick={onClose}>Close</Button>
                <Button
                  onClick={handleSubmit}
                  colorScheme="blue"
                  disabled={!email.trim() && !password.trim()}
                
                  isLoading={isSaving}
                >
                  Login
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default Login;


