import { useMember } from "../../../members/MemberServiceContext";
import { ChatMessage } from "./Types";

export const useChatMessage = () => {
  const { sendMessage, setChatMessage } = useMember();

  const sendChatMessage = (message: ChatMessage) => {
    setChatMessage((prevMessages) => [...prevMessages, message]);
    const payload = {
      type: "chat",
      message: message,
    };
    sendMessage(payload);
  };

  return { sendChatMessage };
};
