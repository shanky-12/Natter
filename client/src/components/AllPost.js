// import '../App.css';
// import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Post from "../components/Post";
// import { collection, getDocs, getFirestore, onSnapshot, query, orderBy, limit } from "firebase/firestore";
// import Comments from '../components/Comments';
// import db from "../lib/firebase";

// //const functions = require('firebase-functions');
// //const admin = require('firebase-admin');

// //admin.initializeApp();
// async function getLoadedImage(imageUrl) {
//   try {
//     const response = await fetch(imageUrl);
//     const imageBlob = await response.blob();
//     const image = await createImageBitmap(imageBlob);
//     return image;
//   } catch (error) {
//     console.error(error);
//   }
// }
// function AllPost() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setLoading] = useState(true);
//   console.log('FirebaseOptions');
//   //const db = getFirestore();
//   //console.log('FirebaseOptions',db);

// /* exports.getSubCollections = functions.https.onCall(async (posts, context) => {

//     const docPath = posts.docPath;

//       console.log(docPath);
//     //const collections = await admin.firestore().doc(docPath).listCollections();
//     //const collectionIds = collections.map(col => col.id);

//     //return { collections: collectionIds };

// }); */

//   async function fetchPost() {
//     //const querySnapshot = await getDocs(collection(db, "posts").orderBy("createdAt", "desc").limit(5));
//     const querySnapshot = await getDocs(query(collection(db, "posts") , orderBy("createdAt", "desc"), limit(5)));
//     //console.log('querySnapshot', querySnapshot);
//     //console.log('querySnapshot-next', querySnapshot.query._query.limit);
//     const data = querySnapshot.docs.map(async (doc) => ({
//       id: doc.id,
//       ...doc.data(),
//       image: await getLoadedImage(doc.data().imageUrl)
//     }));
//     setPosts(data);
//     setLoading(false);
//   }
// //
//   useEffect(() => {
//     fetchPost();
//   }, [])

//   useEffect(() => {
//     const q = query(collection(db, "posts") , orderBy("createdAt", "desc"), limit(5));
    
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const _posts = [];
//       querySnapshot.forEach(async (doc) => {
//         _posts.push({
//           id: doc.id,
//           ...doc.data(),
//           image: await getLoadedImage(doc.data().imageUrl)
//         });
        
//       });
//       setPosts(_posts);
//       console.log("Current posts details: ", posts.join(", "));
//     });

//   }, []);


//   //useEffect(() => {
//   // Hook to handle the initial fetching of posts

//   /*   db.collection("posts")
//      .orderBy("createdAt", "desc")
//      .get()
//      .then((querySnapshot) => {
//        const data = querySnapshot.docs.map((doc) => ({
//          id: doc.id,
//          ...doc.data(),
//        }));
 
//        setPosts(data);
//        setLoading(false);
//      });  */

//   //  }, []);

//   /*  useEffect(() => {
//      // Hook to handle the real-time updating of posts whenever there is a
//      // change in the datastore (https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots)
 
//      db.collection("posts")
//        .orderBy("createdAt", "desc")
//        .onSnapshot((querySnapshot) => {
//          const _posts = [];
 
//          querySnapshot.forEach((doc) => {
//            _posts.push({
//              id: doc.id,
//              ...doc.data(),
//            });
//          });
 
//          setPosts(_posts);
//        });
//    }, []); */

//        if (isLoading) {
//         return (
//           <Flex minH="100vh" justifyContent="center" alignItems="center">
//             <Spinner />
//           </Flex>
//         );
//       }   

//   return (
//       <Container maxW="container.sm" centerContent p={8}> 
//       <Navbar />
//         <VStack spacing={8}>
//           {posts.map((post) => (
//             <Post key={post.id} post={post} />
            
//           ))}
//         {/* <Comments/> */}
//         </VStack>
//       </Container>
//   );
//   }

// export default AllPost;

import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Comments from '../components/Comments';
import '../App.css';
import { getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../lib/firebase";

// async function getLoadedImage(imageUrl) {
//   try {
//     const response = await fetch(imageUrl);
//     const imageBlob = await response.blob();
//     const image = await createImageBitmap(imageBlob);
//     return image;
//   } catch (error) {
//     console.error(error);
//   }
// }
async function getLoadedImage(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}: ${response.statusText}`);
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType.startsWith('image/')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }
    const imageBlob = await response.blob();
    const image = await createImageBitmap(imageBlob);
    return image;
  } catch (error) {
    console.error(error);
  }
}

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function fetchPost() {
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(5)));
    const data = querySnapshot.docs.map(async (doc) => ({
      id: doc.id,
      ...doc.data(),
      image: await getLoadedImage(doc.data().imageUrl)
    }));
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(5));

    const unsubscribe = db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = [];
        querySnapshot.forEach(async (doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
            image: await getLoadedImage(doc.data().imageUrl)
          });
        });
        setPosts(_posts);
        console.log("Current posts details: ", posts.join(", "));
      });

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Navbar />
      <Flex direction="column" align="center" justify="center">
        {isLoading ? (
          <Spinner />
        ) : (
          <VStack spacing={8}>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </VStack>
        )}
      </Flex>
      <Comments />
    </Container>
  );
}

export default AllPost;
