import { Box, HStack, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./VoteButtons";
import { Link, useParams } from 'react-router-dom';
import noImage from '../img/download.jpeg'
const Community = ({ post }) => {

console.log("post val", post.id, post.id.toString())
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
     
        <Text as='b'>{post.title}</Text>
        <Text>{post.description}</Text>
        {/* {post.iurl ? <Image src={post.url} alt="Post image" boxSize='300px' /> :  <Image src={noImage} alt="Post image" boxSize='300px' />} */}
        {/* <Image src={post.iurl} alt="Post image" boxSize='300px' /> */}
        <Text>{post.createdAt}</Text>
      </Box>
     
      {/* <Link to={"/posts/"+post.id.toString()}>
      <Button type = "submit">comment</Button>
      </Link> */}
    </HStack>
  );
};

export default Community;