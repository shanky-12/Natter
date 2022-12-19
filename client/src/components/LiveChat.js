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
  useDisclosure,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Heading,
  Text
} from "@chakra-ui/react";
import { Link, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const LiveChat = ({ myKey,postName,name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = getAuth();
  let postId = myKey;
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
    socketRef.current.emit('message', {
      room:postId,
      name: state.name,
      message: state.message,
    });
    e.preventDefault();
    setState({message: '', name: state.name});
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
 
  
if (myKey !== undefined /*&& sdata*/) {

  return (
          
          <>
      <Button  onClick={onOpen} variant="solid"> LiveChat </Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>LiveChat for {postName} </DrawerHeader>

              <DrawerBody>
              <Card>
                <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='md'>Chat Log</Heading>
                    <Text></Text>
                  </Box>
                  </Stack>
                </CardBody>
              </Card>
                <div className='render-chat'>
                <h1>Chat Log</h1>
                </div>
                
              </DrawerBody>
              <DrawerFooter>
                <Textarea
                  placeholder='Type Here'
                  size='sm'
                  resize='verticle'
                  onChange={(e) => setState({message:e.target.value})}
                />
                <Button onClick={onMessageSubmit} colorScheme="blue">Send</Button>
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

</>
  );
}
}
export default LiveChat;
