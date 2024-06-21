import { Tooltip, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";
interface ScreenShareButtonProps {
  isDisplaySharing: boolean;
  handleScreenShareButton: () => void;
}

export const ScreenShareButton = (props: ScreenShareButtonProps) => {
  const { isDisplaySharing, handleScreenShareButton } = props;
  return (
    <Tooltip
      label={isDisplaySharing ? "Stop sharing my screen" : "Share my screen"}
      hasArrow
      bg="white"
      color="black"
    >
      <IconButton
        isRound
        icon={
          isDisplaySharing ? (
            <MdOutlineScreenShare />
          ) : (
            <MdOutlineStopScreenShare />
          )
        }
        bg="white"
        color={isDisplaySharing ? "green.400" : "red.500"}
        onClick={handleScreenShareButton}
        variant="outline"
        fontSize="24px"
        aria-label={
          isDisplaySharing ? "screen sharing on" : "screen sharing off"
        }
      />
    </Tooltip>
  );
};
