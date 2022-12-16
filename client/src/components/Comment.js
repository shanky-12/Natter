import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc,addDoc, getFirestore, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import db from "../lib/firebase";
import React, { useState, useEffect } from 'react';
import { Container, Flex, Spinner, VStack, Textarea, Text,Button  } from "@chakra-ui/react"; 
import AllCommentDisplay from './AllCommentDisplay';
import '../App.css';

function Comment() {
    let postId = useParams().postnum
    const [loading, setLoading] = useState(true);
    let [sdata, setData] = useState([]);
    let [value, setValue] = React.useState('')
    const date = new Date();
    let x 

    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }


    

    console.log("props in Comment.js", postId)

    async function fetchPost() {
        const docRef = doc(db, `posts/${postId}`);
        const docSnap = await getDoc(docRef);
        setData([docSnap.data()])
        console.log("docSnap.exists()", docSnap.exists())
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    useEffect(() => {
        fetchPost();
    }, [postId])


    async function commentOnPost(value) {
        try {
            console.log("postId/comments", postId)
            console.log("db", db)
            const docRef = collection(db, 'posts');
            x = await addDoc(collection(docRef, postId.toString(), "/comments"), {
             
             // commentId: x.id,  
              comment: value,
              postId: postId,
              createdOn: date.toUTCString(),
              updatedAt: date.toUTCString(),
            });
            console.log("test") ;
            console.log("Document written with ID: ", x.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          //setData("");
        
      }
    


    console.log("data value..", typeof sdata)
    if (postId !== undefined && sdata) {
        //  const { unsplashImages } = data;
        // console.log(data);

        return (
            <div>

                {sdata.map((post) => {
                    return (
                        <div className='card' key={post.id}>
                            <div className='card-body'>
                               Title: {post.title}
                                <br /> 
                                {post.description}
                                <br />
                                <br />
                                {/*  <img className='card' src={image.url} alt={image.id} /> */}
                                <h2 className='card-title'>
                                    {/*  An image by: {image.posterName}  */}
                                </h2>
                                <Text className="comment" mb="8px">Post a Comment</Text>
                                <Textarea
                                    value={value}
                                    onChange={handleInputChange}
                                    placeholder="Post a comment"
                                    size="sm"
                                />
                               {/*  <Button type = "submit">comment</Button> */}
                                <br />

                               {/*  {!post.updatedAt && ( */}
                                    <Button
                                        /* className='button' */
                                        type = "submit"
                                        onClick={() => {
                                            commentOnPost(value);
                                            //image.binned = false;
                                          }}
                                    >
                                        comment
                                    </Button>
                              {/*   )
                                } */}
                                <AllCommentDisplay/>

                            </div>
                        </div>

                    );

                })}

                <div className='card'>


                </div>
            </div>
        );



    } else if (loading) {
        return <div>Loading...</div>;
    }

}


export default Comment;