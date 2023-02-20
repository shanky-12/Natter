

import { Box, HStack, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./VoteButtons";
import { Link, useParams } from 'react-router-dom';
// import gm from "gm";
import noImage from '../img/download.jpeg'


const Community = ({ post }) => {
  console.log("post in communitu.js  .....", post)
  const [url, setUrl] = React.useState(null);
//   console.log("loading post : ")
//   console.log(post)
  
// console.log("post val", post.id, post.id.toString())
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      {/* <VoteButtons post={post} /> */}
      <Box bg="rgb(200,200,200)" p={4} rounded="md" w="100%">
     
        <Text color='black' as='b'>{post.title}</Text>
        <Text color='black'>{post.description}</Text>
        {/* {gm(post.iurl)} */}
        {/* <Image src={post.newUrl} color='black' alt="Image Broken" boxSize='300px' /> */}
        {/* <Image src= {post.newUrl ? post.newUrl : noImage} alt="Post image" boxSize='300px' /> */}
        <Text color='black'>{post.createdAt}</Text>
      </Box>
     
      <Link to={`/allposts/${post.id.toString()}`}>
      <Button type = "submit" color='white' bg='#d34600'>Go to</Button>
      </Link>
    </HStack>
  );
};

export default Community;

// import React from 'react';

// function Image({imageId}) {
//   return (
//     <img src={`/image/${imageId}`} alt="Image" />
//   );
// }

// export default Image;
