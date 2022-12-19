import { Box, HStack, Text, Button, Image, Flex } from "@chakra-ui/react";
import VoteButtons from "./VoteButtons";
import { Link, useParams } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, {useEffect, useState} from 'react';
import LiveChat from "./LiveChat";
const Post = ({ post }) => {

  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        setName(user.displayName);
        // ...
      } else {
        setLoggedIn(false)
      }
    });
  });

console.log("post val", post.id, post.id.toString(), "logged in "+loggedIn)
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
     
        <Text as='b'>{post.title}</Text>
        <Text>{post.description}</Text>
        {post.url ? <Image src={post.url} alt="Post image" boxSize='300px' /> :  <Image src={noImage} alt="Post image" boxSize='300px' />}
        <Text>{post.createdAt}</Text>
      </Box>
     
      <Link to={"/posts/"+post.id.toString()}>
      <Button type = "submit">comment</Button>
      </Link>
      <Flex>
        {loggedIn ? <LiveChat key={post.id} name={name} /> : ""}
        </Flex>
    </HStack>
  );
};

export default Post;
