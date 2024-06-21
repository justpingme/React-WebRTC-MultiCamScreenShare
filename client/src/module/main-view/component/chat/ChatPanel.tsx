import { Flex } from "@chakra-ui/react";
import React from "react";
import { ChatMessages } from "./ChatMessages";
import { ChatInputBox } from "./ChatInputBox";
import { useMember } from "../../../members/MemberServiceContext";

export const ChatPanel = () => {
  const { chatMessage, getMember } = useMember();

  return (
    <Flex w="100%" h="86%" borderRadius="md" direction="column" overflow="none">
      <ChatInputBox />
      <ChatMessages messages={chatMessage} getMember={getMember} />
    </Flex>
  );
};
