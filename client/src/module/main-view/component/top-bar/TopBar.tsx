import { Flex, Tooltip, IconButton } from "@chakra-ui/react";
import React from "react";
import { InfoDialog } from "./InfoDialog";
import { PanelType } from "../../MainView";
import { BsChatLeftText, BsChatLeftTextFill } from "react-icons/bs";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { ChatButton } from "./ChatButton";
import { PeoplePanelButton } from "./PeoplePanelButton";

interface TopBarProps {
  onIconClick: (panel: PanelType) => void;
  activePanel: PanelType;
}

export const TopBar = ({ onIconClick, activePanel }: TopBarProps) => {
  const isPeoplePanelActive = activePanel === PanelType.people;
  const isChatPanelActive = activePanel === PanelType.chat;

  return (
    <Flex
      justify="space-between"
      align="center"
      mx={4}
      bgColor="gray.800"
      boxShadow="md"
    >
      <InfoDialog />
      <Flex mr={4} gap={2}>
        <PeoplePanelButton
          onIconClick={onIconClick}
          isPeoplePanelActive={isPeoplePanelActive}
        />
        <ChatButton
          onIconClick={onIconClick}
          isChatPanelActive={isChatPanelActive}
        />
      </Flex>
    </Flex>
  );
};
