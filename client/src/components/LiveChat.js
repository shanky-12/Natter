import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import '../App.css';
import {
  Button,
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

const LiveChat = ({ myKey,postName,name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let postId = myKey;
  const [state, setState] = useState({message: '', name: name});
  const [chat, setChat] = useState([{name: 'ChatBot', message: `Welcome to ${postName}'s chat`}]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on('message', ({name, message}) => {
      console.log('The server has sent some data to all clients');
      setChat([...chat, {name, message}]);
      renderChat();
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

  const userjoin = () => {
    socketRef.current.emit('user_join',{room:postId,name:name});
  };

  const onMessageSubmit = () => {
    socketRef.current.emit('message', {
      room:postId,
      name: state.name,
      message: state.message,
    });
    setState({message: '', name: state.name});
  };

  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <Text size='sm'>
          {name}: <span>{message}</span>
        </Text>
      </div>
    ));
  };

 
  const Opener= () =>{
    onOpen();
    userjoin();
  }

if (myKey !== undefined /*&& sdata*/) {

  return (
          
          <>
      <Button  onClick={Opener} colorScheme='facebook' variant = "solid"> LiveChat </Button>
          <Drawer  isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader bg='rgb(33,33,33)' color='white'>LiveChat for {postName} </DrawerHeader>

              <DrawerBody bg='rgb(15,15,15)' color='white'>
              <Card bg='rgb(33,33,33)' color='white'>
                <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='md'>Chat Log</Heading>
                    {renderChat()}
                  </Box>
                  </Stack>
                </CardBody>
              </Card>
                
              </DrawerBody>
              <DrawerFooter bg='rgb(33,33,33)' color='white'>
                <Textarea
                  bg='rgb(33,33,33)' 
                  color='white'
                  placeholder='Type Here'
                  value={state.message}
                  size='sm'
                  resize='verticle'
                  onChange={(e)=>setState({message:e.target.value,name:name})}
                />
                <Button onClick={onMessageSubmit} colorScheme="blue" type='submit'>Send</Button>
              </DrawerFooter>
                
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>

</>
  );
}
}
export default LiveChat;