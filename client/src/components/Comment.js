import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import React, { useState, useEffect } from 'react';
import { Textarea, Text, Button, Center, Image } from "@chakra-ui/react";
import AllCommentDisplay from './AllCommentDisplay';
import '../App.css';
import noImage from '../img/download.jpeg'

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
            console.log("test");
            console.log("Document written with ID: ", x.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setValue("");

    }

    console.log("data value..", typeof sdata)
    if (postId !== undefined && sdata) {
        //  const { unsplashImages } = data;
        // console.log(data);

        return (
            <div id={Math.random()}>

                {sdata.map((post, index) => {
                    return (
                        <div id={index} className='card' key={index} >
                            <div className='card-body' >
                                <Text color='white'>
                                    Title: {post.title}
                                </Text>
                                <br />
                                {post.description}
                                <br />
                                <br />
                                <Center>
                                    <Image src={post.newUrl ? post.newUrl : noImage} alt="Post image" boxSize='400px' />
                                </Center>
                              
                                <Text color='white' className="comment" mb="8px">Post a Comment</Text>
                                <label for="my-input">
                                    Label text here...
                                </label>
                                <Textarea
                                    id="my-input"
                                    color='white'
                                    value={value}
                                    onChange={handleInputChange}
                                    placeholder="Post a comment"
                                    size="sm"
                                />
                                {/*  <Button type = "submit">comment</Button> */}
                                <br />
                                <br></br>
                                {/*  {!post.updatedAt && ( */}
                                <Button
                                    bg='#d34600'
                                    color='white'
                                    /* className='button' */
                                    disabled={!value.trim()}
                                    type="submit"
                                    onClick={() => {
                                        commentOnPost(value);
                                        //image.binned = false;
                                    }}
                                >
                                    Comment
                                </Button>
                                {/*   )
                                } */}
                                <AllCommentDisplay />

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