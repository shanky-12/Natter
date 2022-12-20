// import { Box, HStack, Text, Button, Image } from "@chakra-ui/react";
// import React from "react";
// import VoteButtons from "./VoteButtons";
// import { Link, useParams } from 'react-router-dom';
// import gm from 'gm'; 
// import noImage from '../img/download.jpeg'
// function MyResizedImage({ src }) {
  

//   React.useEffect(() => {
//     gm(src)
//       .resize(400, 300)
//       .toBuffer((error, buffer) => {
//         if (error) {
//           console.error(error);
//         } else {
//           setUrl(`data:image/jpeg;base64,${buffer.toString('base64')}`);
//         }
//       });
//   }, [src]);

//   return <img src={url} alt="Post image" boxSize="300px" />;
// }

// const Post = ({ post }) => {

// console.log("post val", post.id, post.id.toString())
// //   return (
// //     <HStack key={post.id} w="100%" alignItems="flex-start">
// //       <VoteButtons post={post} />
// //       <Box bg="gray.100" p={4} rounded="md" w="100%">
     
// //         <Text as='b'>{post.title}</Text>
// //         <Text>{post.description}</Text>
// //         {post.iurl ? (
// //   <MyResizedImage src={post.iurl} />
// // ) : (
// //   <Image src={noImage} alt="Post image" boxSize="300px" />
// // )}

// //         {/* {post.iurl ? <Image src={post.iurl} alt="Post image" boxSize='300px' /> :  <Image src={noImage} alt="Post image" boxSize='300px' />} */}
// //         <Text>{post.createdAt}</Text>
// //       </Box>
     
// //       <Link to={"/posts/"+post.id.toString()}>
// //       <Button type = "submit">comment</Button>
// //       </Link>
// //     </HStack>
// //   );
// // };

// // export default Post;
// return (
//   <div style={{ display: 'flex' }} key={post.id} w="100%" alignItems="flex-start">
//     <VoteButtons post={post} />
//     <Box bg="gray.100" p={4} rounded="md" w="100%">
//       <Text as='b'>{post.title}</Text>
//       <Text>{post.description}</Text>
//       {post.iurl ? (
//         <MyResizedImage src={post.iurl} />
//       ) : (
//         <Image src={noImage} alt="Post image" boxSize="300px" />
//       )}
//       <Text>{post.createdAt}</Text>
//     </Box>
//     <Link to={"/posts/"+post.id.toString()}>
//       <Button type="submit">comment</Button>
//     </Link>
//   </div>
// );
// };

// export default Post;

import { Box, HStack, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import VoteButtons from "./VoteButtons";
import { Link, useParams } from 'react-router-dom';
// import gm from "gm";
import noImage from '../img/download.jpeg'


const Post = ({ post }) => {
  const [url, setUrl] = React.useState(null);
//   console.log("loading post : ")
//   console.log(post)
  
// console.log("post val", post.id, post.id.toString())
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      <Box bg="rgb(200,200,200)" p={4} rounded="md" w="100%">
     
        <Text color='black' as='b'>{post.title}</Text>
        <Text color='black'>{post.description}</Text>
        {/* {gm(post.iurl)} */}
        {/* <Image src={post.newUrl} color='black' alt="Image Broken" boxSize='300px' /> */}
        <Image src= {post.newUrl ? post.newUrl : noImage} alt="Post image" boxSize='300px' />
        <Text color='black'>Community: {post.community}</Text>
        <Text color='black'>{post.createdAt}</Text>
        
      </Box>
     
      <Link to={"/posts/"+post.id.toString()}>
      <Button type = "submit" color='white' bg='#FF5700'>comment</Button>
      </Link>
    </HStack>
  );
};

export default Post;

// import React from 'react';

// function Image({imageId}) {
//   return (
//     <img src={`/image/${imageId}`} alt="Image" />
//   );
// }

// export default Image;
