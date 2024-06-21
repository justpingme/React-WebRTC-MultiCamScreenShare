import { Tooltip, IconButton } from "@chakra-ui/react";
import React from "react";
import { BsChatLeftTextFill, BsChatLeftText } from "react-icons/bs";
import { PanelType } from "../../MainView";

interface ChatButtonProps {
  onIconClick: (panel: PanelType) => void;
  isChatPanelActive: boolean;
}

export const ChatButton = (props: ChatButtonProps) => {
  const { onIconClick, isChatPanelActive } = props;
  return (
    <Tooltip label="Chat Panel" hasArrow bg="white" color="black">
      <IconButton
        isRound={true}
        variant={"ghost"}
        color={isChatPanelActive ? "white" : "white"}
        size="lg"
        _hover={{ background: "gray.700" }}
        icon={
          isChatPanelActive ? (
            <BsChatLeftTextFill size={20} />
          ) : (
            <BsChatLeftText size={20} />
          )
        }
        onClick={() => {
          onIconClick(PanelType.chat);
        }}
        aria-label="Chat"
      />
    </Tooltip>
  );
};
