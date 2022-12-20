import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDocs, where, getDoc, addDoc, getFirestore, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import React, { useState, useEffect } from 'react';
import { Container, Flex, Spinner, VStack, Textarea, Text, Box, Button, Center, Image } from "@chakra-ui/react";
import AllCommentDisplay from './AllCommentDisplay';
import '../App.css';
import noImage from '../img/download.jpeg'

function Replies(props) {

    let postId = useParams().postnum
    let commentId = props.id

    const [replies, setReplies] = useState([]);
    console.log("Replies component", commentId, postId)

    async function fetchComments() {
        const querySnapshot = await getDocs(query(collection(db, "replies"), where('postId', '==', postId), where('commentId', '==', commentId)));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("data replies component....", data)
        setReplies(data)
    }
    //
    useEffect(() => {
        fetchComments();
    }, [postId])

    useEffect(() => {
        const q = query(collection(db, "replies"), where('postId', '==', postId), where('commentId', '==', commentId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const _comments = [];
          querySnapshot.forEach((doc) => {
            _comments.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setReplies(_comments);
          console.log("Current replies details: ", replies.join(", "));
        });
      }, [postId]);

    return (
        <>
            <div>
                <Box bg="gray.100" p={4} rounded="md" w="100%">
                 {replies.map((reply)=>(
                        <Text key= {Math.random()}>{reply.reply}</Text>
                ))}
                </Box>
            </div>

        </>
    );


}


export default Replies;