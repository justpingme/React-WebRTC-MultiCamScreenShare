import React, { useState } from "react";
import {
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { BottomBar } from "./component/bottom-bar/BottomBar";
import { MainViewContent } from "./component/main-view/MainViewContent";
import { TopBar } from "./component/top-bar/TopBar";
import { DrawerPanel } from "./component/main-view/DrawerPanel";

export enum PanelType {
  none,
  people,
  chat,
}

export const MainView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.none);

  const handleIconClick = (panel: PanelType) => {
    if (isOpen && activePanel === panel) {
      onClose();
      setActivePanel(PanelType.none);
    } else {
      setActivePanel(panel);
      if (!isOpen) {
        onOpen();
      }
    }
  };
  const handleClose = () => {
    onClose();
    setActivePanel(PanelType.none);
  };

  return (
    <Flex direction="column" height="100vh" bgColor="gray.800">
      <TopBar onIconClick={handleIconClick} activePanel={activePanel} />
      <MainViewContent />
      <BottomBar />
      <DrawerPanel
        isOpen={isOpen}
        onClose={handleClose}
        activePanel={activePanel}
      />
    </Flex>
  );
};
