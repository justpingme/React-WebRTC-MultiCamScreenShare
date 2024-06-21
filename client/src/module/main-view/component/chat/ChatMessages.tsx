import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import { ChatMessage } from "./Types";
import { Member } from "../../../members/types";
interface ChatMessagesProps {
  messages: ChatMessage[];
  getMember: (memberId: string) => Member | undefined
}
export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages, getMember } = props;
  return (
    <Box overflowY="auto" flex="1">
      {messages.map((message: ChatMessage, index: number) =>
        Message(index, message, getMember)
      )}
    </Box>
  );
};

const Message = (
  index: number,
  message: ChatMessage,
  getMember: (memberId: string) => Member | undefined
) => {
  const member = getMember(message.memberId);
  const name = member?.isLocal ? "You" : member?.name;
  const time = message.time;
  const textMessage = message.textMessage;
  return (
    <Flex
      key={index}
      direction="column"
      px={4}
      py={2}
      borderRadius="md"
      mb={2}
      align={member?.isLocal ? "flex-end" : "flex-start"}
    >
      <Text fontSize="sm" color="gray.400">
        {name} • {time}
      </Text>
      <Text>{textMessage}</Text>
    </Flex>
  );
};
