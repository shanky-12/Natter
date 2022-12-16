import { useDisclosure, Button, FormControl, FormLabel, Input, Textarea, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../lib/firebase";

const AddNewPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [isSaving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    const date = new Date();
    if (!imageFile || !videoFile) {
      // Display an error message or do something else to let the user know that they need to select a file.
      return;
    }
    try {
       // added code to read video file data
       const videoReader = new FileReader();
       videoReader.readAsDataURL(videoFile);
       videoReader.onload = async () => {
      const videoDataUrl = videoReader.result;

      const imageReader = new FileReader();
      imageReader.readAsDataURL(imageFile);
      imageReader.onload = async () => {
      const imageDataUrl = imageReader.result;
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        description,
        imageDataUrl,
        videoDataUrl,
        upVotesCount: 0,
        downVotesCount: 0,
        createdAt: date.toUTCString(),
        updatedAt: date.toUTCString(),
      });

      console.log("Document written with ID: ", docRef.id);
    };
  };
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    onClose();
    setTitle("");
    setDescription("");
    setImageFile(null);
    setVideoFile(null);
    setSaving(false);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add new post
      </Button>

      <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add new post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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

              <FormControl id="post-imageupload">
                <FormLabel>Upload Image</FormLabel>
                <input
                  type="file"
                  alt="No image"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </FormControl>
              <FormControl id="post-videoupload">
                <FormLabel>Upload Video</FormLabel>
                <input
                  type="file"
                  alt="No file"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSaving}
                onClick={handleSubmit}
                variantcolor="blue"
              >
                Save
                  </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </>
    );
  };
               
  export default AddNewPost;