import { Box, CloseButton, Flex } from "@chakra-ui/react";
import React from "react";
import { PanelType } from "../../MainView";
import { ChatPanel } from "../chat/ChatPanel";
import { PeoplePanel } from "../people-panel/PeoplePanel";

interface DrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activePanel: PanelType;
}

export const DrawerPanel = (props: DrawerPanelProps) => {
  const { isOpen, onClose, activePanel } = props;

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          w="350px"
          h="96%"
          bg="gray.800"
          color="white"
          boxShadow="xl"
          zIndex="overlay"
          borderRadius="md"
          overflowY="auto"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="gray.500"
          >
            <Box ml={6} fontSize="xl" fontWeight="bold" my={6}>
              {activePanel === PanelType.people ? "People" : "Chat"}
            </Box>
            <CloseButton mx={10} mb={2} onClick={onClose} size="xl" />
          </Flex>
          <Box height="90%">
            {activePanel === PanelType.people && <PeoplePanel />}
            {activePanel === PanelType.chat && <ChatPanel />}
          </Box>
        </Box>
      )}
    </>
  );
};
