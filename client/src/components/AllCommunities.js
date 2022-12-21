import '../App.css';
import { Container, Flex, Spinner, VStack, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Community from "../components/Community";
import { collection, getDocs,  onSnapshot, query, orderBy, limit } from "firebase/firestore";
import {db} from "../lib/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddNewCommunity from './AddNewCommunity';


function AllCommunities() {
  const [community, setCommunity] = useState([]);
  const [isLoading, setLoading] = useState(true);
  console.log('FirebaseOptions');
  const auth = getAuth();
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
  });
 
  async function fetchPost() {
    //const querySnapshot = await getDocs(collection(db, "posts").orderBy("createdAt", "desc").limit(5));
    const querySnapshot = await getDocs(query(collection(db, "community") , orderBy("createdAt", "desc"), limit(5)));
    //console.log('querySnapshot', querySnapshot);
    //console.log('querySnapshot-next', querySnapshot.query._query.limit);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCommunity(data);
    setLoading(false);
  }
//
  useEffect(() => {
    fetchPost();
  }, [])


  useEffect(() => {
    const q = query(collection(db, "community") , orderBy("createdAt", "desc"));
    //const querySnapshot = await getDocs(query(collection(db, "community") , orderBy("createdAt", "desc"), limit(5)));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _community = [];
      querySnapshot.forEach((doc) => {
        _community.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCommunity(_community);
      console.log("Current communities details: ", community.join(", "));
    });
  }, []);

  // useEffect(() => {
  //   const q = query(collection(db, "community") , orderBy("createdAt", "desc"), limit(5));
    
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const _posts = [];
  //     querySnapshot.forEach((doc) => {
  //       _posts.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
        
  //     });
  //     setPosts(_posts);
  //     console.log("Current posts details: ", posts.join(", "));
  //   });

  // }, []);

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
   {/*  https://chakra-ui.com/docs/components/container */}
      {/* <Navbar /> */}
      <Heading>
        All Communities
      </Heading>
      
      {loggedIn ? <AddNewCommunity /> : ""}
      {<Container maxW="container.sm" centerContent p={8}>  
        <VStack spacing={8} w="100%">
          {community.map((post) => (
            <Community post={post} key={post.id} />
            
          ))}
        {/* <Comments/> */}
        </VStack>
      </Container>
      }
      </div>
     
    </>
  );
}

export default AllCommunities;
