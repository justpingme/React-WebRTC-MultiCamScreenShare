import { IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsPeopleFill, BsPeople } from "react-icons/bs";
import { PanelType } from "../../MainView";

interface PeoplePanelButtonProps {
  onIconClick: (panel: PanelType) => void;
  isPeoplePanelActive: boolean;
}
export const PeoplePanelButton = (props: PeoplePanelButtonProps) => {
  const { onIconClick, isPeoplePanelActive } = props;
  return (
    <Tooltip label="People Panel" hasArrow bg="white" color="black">
      <IconButton
        isRound={true}
        variant={"ghost"}
        color={isPeoplePanelActive ? "white" : "white"}
        size="lg"
        _hover={{ background: "gray.700" }}
        icon={
          isPeoplePanelActive ? (
            <BsPeopleFill size={25} />
          ) : (
            <BsPeople size={25} />
          )
        }
        onClick={() => {
          onIconClick(PanelType.people);
        }}
        aria-label="People"
      />
    </Tooltip>
  );
};
