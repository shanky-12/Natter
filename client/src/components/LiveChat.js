import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import '../App.css';
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { Link, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../lib/firebase";
import Post from "../components/Post";
import { collection, doc, getDoc,addDoc, getFirestore, onSnapshot, query, orderBy, limit } from "firebase/firestore";

const LiveChat = ({ key,name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = getAuth();
  let postId = key;
  const [state, setState] = useState({message: '', name: name});
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('/');
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setState({message: '', name: user.displayName});
          // ...
        } else {
          // User is signed out
          // ...
          setState({message: '', name: ''});
        }
      });
  });

  useEffect(() => {
    socketRef.current.on('message', ({name, message}) => {
      console.log('The server has sent some data to all clients');
      setChat([...chat, {name, message}]);
    });
    socketRef.current.on('user_join', function (data) {
      setChat([
        ...chat,
        {name: 'ChatBot', message: `${data} has joined the chat`},
      ]);
    });

    return () => {
      socketRef.current.off('message');
      socketRef.current.off('user-join');
    };
  }, [chat]);

  const userjoin = (name) => {
    socketRef.current.emit('user_join',{room:postId,name:name});
  };

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById('message');
    console.log([msgEle.name], msgEle.value);
    setState({...state, [msgEle.name]: msgEle.value});
    socketRef.current.emit('message', {
      room:postId,
      name: state.name,
      message: msgEle.value,
    });
    e.preventDefault();
    setState({message: '', name: state.name});
    msgEle.value = '';
    msgEle.focus();
  };

  const renderChat = () => {
    userjoin(state.name);
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };
  
  if (postId !== undefined /*&& sdata*/) {

  return (
    
      <div>
          
          <Button  onClick={onOpen} variant="solid"> LiveChat</Button>
          <Drawer isOpen={isOpen} placement="right"onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>LiveChat for </DrawerHeader>

              <DrawerBody>
                <div className='render-chat'>
                <h1>Chat Log</h1>
                {renderChat()}
                </div>
                
              </DrawerBody>
              <DrawerFooter>
                <FormControl>

                </FormControl>
              </DrawerFooter>
                
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          {/* {former&&(<div>
            <div className="chat-popup" id="myForm">
            <form onSubmit={onMessageSubmit} className="form-container">
              <h1>Messenger</h1>
              <div>
                <Textarea placeholder="Type message.."
                  name='message'
                  id='message'
                  variant='outlined'
                  label='Message'
                />
              </div>
              <Button className="btn">Send Message</Button>
              <Button onClick={onClose}>Close</Button>
            </form>
          </div></div>)} */}
        
        </div>

    
  );
}
}
export default LiveChat;
