import '../App.css';
import { Container, Flex, Spinner, VStack,Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { collection, getDocs, getFirestore, onSnapshot, query, orderBy, limit, startAfter } from "firebase/firestore";
//import Comments from '../components/Comments';
import db from "../lib/firebase";

//const functions = require('firebase-functions');
//const admin = require('firebase-admin');

//admin.initializeApp();

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [lastVis,setLastVis]=useState({});
  console.log('FirebaseOptions');
 
  //for pagenation
  //https://firebase.google.com/docs/firestore/query-data/query-cursors
  async function fetchPost() {
    //const querySnapshot = await getDocs(collection(db, "posts").orderBy("createdAt", "desc").limit(5));
    const querySnapshot = await getDocs(query(collection(db, "posts") , orderBy("createdAt", "desc"), limit(5)));
    //console.log('querySnapshot', querySnapshot);
    //console.log('querySnapshot-next', querySnapshot.query._query.limit);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // setLastVis(querySnapshot.docs[querySnapshot.docs.length-1]);
    // console.log("lastvis "+lastVis.id);
    // alert(lastVis);
    setPosts(data);
    setLoading(false);
  }
//
  useEffect(() => {
    fetchPost();
  }, [])

  useEffect(() => {
    const q = query(collection(db, "posts") , orderBy("createdAt", "desc"), limit(5));
    

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
      {/* <Navbar /> */}
      {<Container maxW="container.sm" centerContent p={8}>  
        <VStack spacing={8} w="100%">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
            
          ))}
        {/* <Comments/> */}
        </VStack>
        <Button>Next</Button>
      </Container>
      }
      </div>
     
    </>
  );
}

export default AllPost;
