import '../App.css';
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { collection, getDocs, getFirestore, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import Comments from '../components/Comments';
import db from "../lib/firebase";

//const functions = require('firebase-functions');
//const admin = require('firebase-admin');

//admin.initializeApp();

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  console.log('FirebaseOptions');
  //const db = getFirestore();
  //console.log('FirebaseOptions',db);

/* exports.getSubCollections = functions.https.onCall(async (posts, context) => {

    const docPath = posts.docPath;

      console.log(docPath);
    //const collections = await admin.firestore().doc(docPath).listCollections();
    //const collectionIds = collections.map(col => col.id);

    //return { collections: collectionIds };

}); */

  async function fetchPost() {
    //const querySnapshot = await getDocs(collection(db, "posts").orderBy("createdAt", "desc").limit(5));
    const querySnapshot = await getDocs(query(collection(db, "posts") , orderBy("createdAt", "desc"), limit(5)));
    //console.log('querySnapshot', querySnapshot);
    //console.log('querySnapshot-next', querySnapshot.query._query.limit);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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


  //useEffect(() => {
  // Hook to handle the initial fetching of posts

  /*   db.collection("posts")
     .orderBy("createdAt", "desc")
     .get()
     .then((querySnapshot) => {
       const data = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));
 
       setPosts(data);
       setLoading(false);
     });  */

  //  }, []);

  /*  useEffect(() => {
     // Hook to handle the real-time updating of posts whenever there is a
     // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)
 
     db.collection("posts")
       .orderBy("createdAt", "desc")
       .onSnapshot((querySnapshot) => {
         const _posts = [];
 
         querySnapshot.forEach((doc) => {
           _posts.push({
             id: doc.id,
             ...doc.data(),
           });
         });
 
         setPosts(_posts);
       });
   }, []); */

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
      </Container>
      }
      </div>
     
    </>
  );
}

export default AllPost;
