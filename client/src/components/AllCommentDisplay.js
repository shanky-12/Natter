import { Flex, Spinner, Box, HStack, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import db from "../lib/firebase";
import DeleteCommentModal from './modals/DeleteCommentModal';

function AllCommentDisplay() {
  let postId = useParams().postnum;
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null);

  const handleOpenDeleteModal = (comment) => {
    setShowDeleteModal(true);
    setDeleteComment(comment);
  };

  const handleCloseModals = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    async function fetchPost() {
      const querySnapshot = await getDocs(
        query(collection(db, `posts/${postId}/comments`), where("postId", "==", postId))
      );
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(data);
      setLoading(false);
    }

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const q = query(
      collection(db, `posts/${postId}/comments`),
      where("postId", "==", postId)
    );
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

    return () => unsubscribe();
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
        {comments.map((comment) => (
          <HStack key={comment.id} w="100%" alignItems="flex-start">
            <Box bg="gray.100" p={4} rounded="md" w="100%">
              <Text>{comment.comment}</Text>
            </Box>

            <Button type="submit">Reply</Button>
            <Button
              onClick={() => {
                handleOpenDeleteModal(comment);
              }}
            >
              Delete
            </Button>

            {showDeleteModal && (
              <DeleteCommentModal
                isOpen={showDeleteModal}
                comment={deleteComment}
                onClose={handleCloseModals}
              />
            )}
           </HStack>
            
          ))}
     </div>
                 
    </>
    );      }
    export default AllCommentDisplay;
