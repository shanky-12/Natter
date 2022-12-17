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
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
//import db from "../lib/firebase";
import db from "../lib/firebase";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

//const app = initializeApp(firebaseConfig);

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [name, setName] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [errorD, setErrorD] = useState("");

  const auth = getAuth();

  const handleSubmit = async () => {
    setSaving(true);
    if(passwordC !== password){
      setError(true);
      setErrorD("Passwords do not match!")
    }else{
      try{
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, {
          displayName: name,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        });
        setError(false);
        onClose();
      }catch(error){
        setError(true);
        setErrorD(error.message)
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    }
    
      setSaving(false);
      
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Register
      </Button>
      {/* {loading ? <Spinner> : <Text color={color}>Hi</Text>} */}

      <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Register</ModalHeader>

            <FormLabel id="error">{error ? errorD : ""}</FormLabel>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired id="post-title">
                <FormLabel>Email</FormLabel>
                <Input
                  type="post-title"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired id="post-title">
                <FormLabel>Password</FormLabel>
                <Input
                  type="post-title"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired id="post-title">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="post-title"
                  placeholder="Enter password"
                  value={passwordC}
                  onChange={(e) => setPasswordC(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired id="post-title">
                <FormLabel>Display Name</FormLabel>
                <Input
                  type="post-title"
                  placeholder="Enter Display Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  Register
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default Register;