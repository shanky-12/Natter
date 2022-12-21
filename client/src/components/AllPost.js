import '../App.css';
import { useParams } from 'react-router-dom';
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { collection, getDocs, onSnapshot, query, orderBy,  where } from "firebase/firestore";
import {db, auth} from "../lib/firebase"
import AddNewPost from './AddNewPost';
import {onAuthStateChanged } from "firebase/auth";
function AllPost() {
  let communityId = useParams().postnum
  console.log("communityId in ALlposts.js", communityId)

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        // ...
      } else {
        setLoggedIn(false)
      }
    });
  }, []);
  console.log('FirebaseOptions');
 
  async function fetchPost() {
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"),where("communityId", "==", communityId)));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data)
    setPosts(data);
    setLoading(false);
  }


  useEffect(() => {
    fetchPost();
  }, [communityId])

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), where("communityId", "==", communityId));   
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _posts = [];
      querySnapshot.forEach((doc) => {
        _posts.push({
          id: doc.id,
          ...doc.data(),
        });
        
      });
      setPosts(_posts);
      console.log("Current posts details: ", posts.join(", "));
    });

  }, [communityId]);
 

       if (isLoading) {
        return (
          <Flex minH="100vh" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        );
      }   

  return (
    <>
    <div className='homePage'>
      
      {loggedIn ? <AddNewPost /> : ""}
   {/*  https://chakra-ui.com/docs/components/container */}
      {/* <Navbar /> */}
      {<Container maxW="container.sm" centerContent p={8}>  
        <VStack spacing={8} w="100%">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
            
          ))}
        {/* <Comments/> */}
        </VStack>
      </Container>
      }
      </div>
     
    </>
  );
}

export default AllPost;
