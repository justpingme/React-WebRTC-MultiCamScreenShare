import { Tooltip, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
interface MicrophoneButtonProps {
  isMicEnabled: boolean;
  handleMicButton: () => void;
}

export const MicrophoneButton = (props: MicrophoneButtonProps) => {
  const { isMicEnabled, handleMicButton } = props;
  return (
    <Tooltip
      label={isMicEnabled ? "Turn mic off" : "Turn mic on"}
      hasArrow
      bg="white"
      color="black"
    >
      <IconButton
        isRound
        icon={isMicEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
        bg="white"
        color={isMicEnabled ? "green.400" : "red.500"}
        onClick={handleMicButton}
        variant="solid"
        fontSize="20px"
        aria-label={isMicEnabled ? "mic on" : "mic off"}
      />
    </Tooltip>
  );
};
