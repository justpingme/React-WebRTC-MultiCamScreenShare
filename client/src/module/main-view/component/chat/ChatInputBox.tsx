import { Flex, Textarea, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ChatMessage } from "./Types";
import { useChatMessage } from "./useChatMessage";
import { useMember } from "../../../members/MemberServiceContext";

export const ChatInputBox = () => {
  const [newMessage, setNewMessage] = useState("");
  const { sendChatMessage } = useChatMessage();
  const { members } = useMember();
  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessage = {
      memberId: members[0].memberId,
      textMessage: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    sendChatMessage(newChatMessage);
    setNewMessage("");
  };
  return (
    <Flex
      height="100px"
      p={2}
      borderTop="1px solid"
      borderColor="gray.400"
      borderRadius="md"
      position="fixed"
      bottom={2}
      right={2}
      align="end"
      width={"340px"}
    >
      <Textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleMessageSend();
          }
        }}
        placeholder="Type your message..."
        size="sm"
        flex="1"
        mr={2}
        borderRadius="md"
        height="90%"
      />
      <Button
        bottom={0}
        onClick={handleMessageSend}
        colorScheme="blue"
        size="sm"
        leftIcon={<FaPaperPlane />}
        borderRadius="md"
      >
        Send
      </Button>
    </Flex>
  );
};
