import { Box, Container, Flex, Image } from "@chakra-ui/react";
import React from "react";
import AddNewPost from "./AddNewPost";

const Navbar = () => {
  return (
    <Box position="sticky" top={0} p={4} bg="gray.100" zIndex={1}>
      <Container maxW="md" centerContent>
      <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >  
      <Image src="/images/redditFace.svg" height="30px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
             />
        </Flex>
        <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
          <AddNewPost />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
