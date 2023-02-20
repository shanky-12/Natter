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
  //import db from "../lib/firebase";

  import { collection, addDoc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import {db} from "../lib/firebase"
  //const app = initializeApp(firebaseConfig);
  
  const AddNewCommunity = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [uid, setUID] = useState("");
    const [isSaving, setSaving] = useState(false);
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
    const handleSubmit = async () => {
      //const db = getFirestore(app);
      console.log("db", db);
      setSaving(true);
      const date = new Date();
  
      try {
        const docRef = await addDoc(collection(db, "community"), {
          title: title,
          userID: uid,
          description: description,
        //   imageUpload: imageUpload,
          upVotesCount: 0,
          downVotesCount: 0,
          createdAt: date.toUTCString(),
          updatedAt: date.toUTCString(),
        });
  
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  
      onClose();
      setTitle("");
      setDescription("");
      setImageUpload("");
  
      setSaving(false);
    };
  
    return (
      <>
        <Button onClick={onOpen} variant="solid" colorScheme='facebook' size="lg">
          Add new community
        </Button>
        <br></br>

  
        <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Add new community</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired id="post-title">
                  <FormLabel>Community title</FormLabel>
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
  
                {/* <FormControl id="post-imageupload">
                  <FormLabel>Image Upload</FormLabel>
                  <input
                    type="file"
                    alt="No image"
                    value={imageUpload}
                    onChange={(e) => setImageUpload(e.target.value)}
                  />
                </FormControl> */}
              </ModalBody>
              <ModalFooter>
                <HStack spacing={4}>
                  <Button onClick={onClose}>Close</Button>
                  <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    disabled={!title.trim() && !description.trim()}
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
  
  export default AddNewCommunity;
  