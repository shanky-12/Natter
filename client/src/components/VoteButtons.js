import { IconButton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const VoteButtons = ({ post }) => {
  const [isVoting, setVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    // Fetch the previously voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse" and update the item on localStorage. Return "true" if the user has already voted the post.
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];
    console.log("votesFromLocalStorage", votesFromLocalStorage)
    try {
      // Parse the value of the item from localStorage. If the value of the
      // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }
    setVotedPosts(previousVotes);
  }, []);

  const handleDisablingOfVoting = (postId) => {
    // This function is responsible for disabling the voting button after a
    // user has voted. Fetch the previously voted items from localStorage. See
    // https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.parse"
    // and update the item on localStorage.
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);

    // Update the voted items from localStorage. See https://stackoverflow.com/a/52607524/1928724 on why we need "JSON.stringify" and update the item on localStorage.
    localStorage.setItem("votes", JSON.stringify(votedPosts));
  };

  const handleClick = async (type) => {
    setVoting(true);
    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;
    const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    console.log("post.id", post.id, upVotesCount)
    //await db.collection("posts").doc(post.id).set({
    /* await getDocs(collection(db, "posts")).doc(post.id).set({
      title: post.title,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    }); */
    await setDoc(doc(db, "posts", post.id), {
      title: post.title,
      description : post.description,
      newUrl: post.newUrl,
      userID: post.userID,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
      community: post.community,
      communityId: post.communityId
    });
    // Disable the voting button once the voting is successful.
    handleDisablingOfVoting(post.id);
    setVoting(false);
  };

  const checkIfPostIsAlreadyVoted = () => {
    if (votedPosts.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <VStack>
        
        <Text bg="#d34600" rounded="md" align='center' fontSize='2xl' height='48px' color='white' width='48px' p={1} >
          <b>{post.upVotesCount}</b>
        </Text>

        <Text bg="#d34600" rounded="md" height='48px' fontSize='2xl' width='48px' color='white' p={1}>
        <b>{post.downVotesCount}</b>
        </Text>
      </VStack>
      <VStack>
      <IconButton
          size="lg"
          colorScheme="green"
          aria-label="Upvote"
          icon={<FiArrowUp />}
          onClick={() => handleClick("upvote")}
          isLoading={isVoting}


          isDisabled={checkIfPostIsAlreadyVoted()}
        />
        <IconButton
          size="lg"
          colorScheme="red"
          aria-label="Downvote"
          icon={<FiArrowDown />}
          onClick={() => handleClick("downvote")}
          isLoading={isVoting}
         isDisabled={checkIfPostIsAlreadyVoted()}
        />
        
      </VStack>
    </>
  );
};

export default VoteButtons;
