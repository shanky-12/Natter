import '../App.css';
import { Container, Flex, Spinner, VStack,  Box, HStack, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Post from "../components/Post";
import { collection, getDocs, getFirestore, onSnapshot, query, orderBy, limit, where } from "firebase/firestore";
import DeleteCommentModal from './modals/DeleteCommentModal';
import db from "../lib/firebase";

//const functions = require('firebase-functions');
//const admin = require('firebase-admin');
//admin.initializeApp();

function AllCommentDisplay() {
  let postId = useParams().postnum  
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null); 
  console.log('inside AllCommentDisplay file');
 
  const handleOpenDeleteModal = (comment) => {
    setShowDeleteModal(true);
    setDeleteComment(comment);
  };

  const handleCloseModals = () => {
    setShowDeleteModal(false);
  };


  async function fetchPost() {
    const querySnapshot = await getDocs(query(collection(db, "posts/"+postId+"/comments") , where('postId', '==', postId)));
    console.log('querySnapshot in allcomment display', querySnapshot);
    //console.log('querySnapshot-next', querySnapshot.query._query.limit);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(data);
    setLoading(false);
  }
//
  useEffect(() => {
    fetchPost();
  }, [postId])

  useEffect(() => {
    const q = query(collection(db, "posts/"+postId+"/comments") , where('postId', '==', postId), orderBy("createdOn", "desc"));    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _comments = [];
      querySnapshot.forEach((doc) => {
        _comments.push({
          id: doc.id,
          ...doc.data(),
        });       
      });
      setComments(_comments);
      console.log("Current comments details: ", comments.join(", "));
    });
  }, []);

       if (isLoading) {
        return (
          <Flex minH="100vh" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        );
      }   

  return (
    <>
    <div>
   {/*  https://chakra-ui.com/docs/components/container */}
   
      {<Container maxW="container.sm" centerContent p={8}>  
        <VStack spacing={8} w="100%">
          {comments.map((comment) => (
          /*   <Post post={post} key={post.id} /> */
            <HStack key={comment.id} w="100%" alignItems="flex-start">
            <Box bg="gray.100" p={4} rounded="md" w="100%">
              <Text>{comment.comment}</Text>
              {/* <Text>{post.description}</Text> */}
            </Box>
          
            <Button type = "submit">Reply</Button>            
          {/*   <Button type = "submit">Delete</Button>  */}
            <Button
                 /*  className='button' */
                  onClick={() => {
                    handleOpenDeleteModal(comment);
                  }}
                >
                  Delete
            </Button>

            {showDeleteModal && showDeleteModal && (
          <DeleteCommentModal
            isOpen={showDeleteModal}
            handleClose={handleCloseModals}
            deleteComment={deleteComment}
          />
        )}
            {/* <Link to={"/posts/"+post.id.toString()}>
             <Button type = "submit">comment</Button> 
            </Link> */}
          </HStack>
            
          ))}
        </VStack>
      </Container>
      }
      </div>
     
    </>
  );
}

export default AllCommentDisplay;
