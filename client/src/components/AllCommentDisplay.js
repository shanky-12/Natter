import '../App.css';
import { Container, Flex, Spinner, VStack, Box, HStack, Text, Button, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { collection, getDocs, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import DeleteCommentModal from './modals/DeleteCommentModal';
import { db } from "../lib/firebase";
import Replies from './Replies';


function AllCommentDisplay() {
  let postId = useParams().postnum
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [openTextAreaCommentId, setOpenTextAreaCommentId] = useState(null);
  const [reply, setReply] = useState('');
  const [commID, setcommID] = useState('');
  const date = new Date();
  let x

  console.log("replyyyy check:", reply)
  console.log('inside AllCommentDisplay file');

  const handleOpenDeleteModal = (comment) => {
    setShowDeleteModal(true);
    setDeleteComment(comment);
  };

  const handleCloseModals = () => {
    setShowDeleteModal(false);
  };


  const handleReply = (comment) => {
    console.log("comment in allcomment display.js", comment)
    console.log("comment id in allcomment display.js", comment.id)
    setOpenTextAreaCommentId(comment.id)
    setOpenTextArea(true)
  };

  const replyMethod = (reply) => {
    console.log("inside replyMathod", reply.message, reply.id)
    console.log("inside reply Method reply.message", reply.message)
    let r = reply.message
    console.log("reply.trim().length()", r.trim().length)
    if(r.trim() == ""){
      console.log("reply.trim().length()", r.trim())
      alert("reply contain empty spaces. Please enter value before posting.")
      
    }
    setReply(reply.message)
    setcommID(reply.id)

    //setOpenTextArea(true)
  };

 
  async function onMessageSubmit(value) {
    try {

      if(!reply){
        setOpenTextArea(false)
      }
      console.log("reply value in onMessageSubmit", reply, value, postId)
   
      const docRef = await addDoc(collection(db, "replies"), {
        reply: reply,
        postId: postId,
        commentId: value.id,
        createdOn: date.toUTCString(),
        updatedAt: date.toUTCString(),
      });
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setReply('')
    setOpenTextArea(false)
    //setOpenTextArea(false)
    //setOpenTextAreaCommentId(null)
  }


  async function fetchPost() {
    const querySnapshot = await getDocs(query(collection(db, "posts/" + postId + "/comments"), where('postId', '==', postId)));
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
    const q = query(collection(db, "posts/" + postId + "/comments"), where('postId', '==', postId), orderBy("createdOn", "desc"));
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
        {<Container maxW="container.sm" centerContent p={8}>
          <VStack spacing={8} w="100%">
            {comments.map((comment) => (
              /*   <Post post={post} key={post.id} /> */
              
              <HStack key={comment.id} w="100%" alignItems="flex-start">
                <Box bg="gray.100" p={4} rounded="md" w="100%">
                  <Text >{comment.comment}</Text>
                
                  <Box bg="gray.100" p={4} rounded="md" w="100%">

                    <Replies id={comment.id}/> 
               
                  </Box>
                  {/* <Text>{post.description}</Text> */}
                </Box>{/* <Text>sd</Text> */}
                {!reply ? <Button bg='rgb(200,200,200)' type="submit"
                  onClick={(e) =>
                    handleReply({ id: comment.id, type: "replying" })
                  }
                >Reply</Button> :

                  <Button bg='#d34600'
                    type="submit"
                    onClick={(e) =>
                      onMessageSubmit({ id: comment.id })
                    }>Post</Button>

                }
                <br />
                <br />

                {openTextArea && (openTextAreaCommentId == `${comment.id}`) && (
                  <HStack spacing={8} w="100%">
                    <Textarea
                      color='white'
                      placeholder='Type Here'
                      size='sm'
                      resize='vertical'
                      onChange={(e) => replyMethod({ message: e.target.value, id: comment.id })}
                    />
                  </HStack>
                )}



                <Button
                  bg='red'
                  color='white'
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
