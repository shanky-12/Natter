import { Box, HStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./VoteButtons";
import { Link, useParams } from 'react-router-dom';

const Post = ({ post }) => {

console.log("post val", post.id, post.id.toString())
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Text as='b'>{post.title}</Text>
        <Text>{post.description}</Text>
      </Box>
      <Link to={"/posts/"+post.id.toString()}>
      <Button type = "submit">comment</Button>
      </Link>
    </HStack>
  );
};

export default Post;
