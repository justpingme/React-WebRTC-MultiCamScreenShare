import { Tooltip, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
interface WebCamButtonProps {
  isWebCamEnabled: boolean;
  handleWebCamButton: () => void;
}

export const WebCamButton = (props: WebCamButtonProps) => {
    const { isWebCamEnabled, handleWebCamButton } = props;
  return (
    <Tooltip
      label={isWebCamEnabled ? "Turn camera off" : "Turn camera on"}
      hasArrow
      bg="white"
      color="black"
    >
      <IconButton
        isRound
        icon={isWebCamEnabled ? <FaVideo /> : <FaVideoSlash />}
        bg="white"
        color={isWebCamEnabled ? "green.400" : "red.500"}
        onClick={handleWebCamButton}
        variant="outline"
        fontSize="20px"
        aria-label={isWebCamEnabled ? "camera on" : "camera off"}
      />
    </Tooltip>
  );
};
