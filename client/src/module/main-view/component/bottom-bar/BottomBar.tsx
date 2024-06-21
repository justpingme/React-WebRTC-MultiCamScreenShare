import { Flex } from "@chakra-ui/react";
import React from "react";
import { useMediaService } from "../../../media/useMediaService";
import { useMainViewAdapter } from "../../hooks/useMainViewAdapter";
import { TimeDisplay } from "./TimeDisplay";
import { LeaveButton } from "./button/LeaveButton";
import { MicrophoneButton } from "./button/MicrophoneButton";
import { WebCamButton } from "./button/WebCamButton";
import { ScreenShareButton } from "./button/ScreenShareButton";

export const BottomBar = () => {
  const { isMicEnabled, isWebCamEnabled, isDisplaySharing } = useMediaService();

  const {
    handleMicButton,
    handleWebCamButton,
    handleScreenShareButton,
    onleaveSession,
    onEndSession,
    isMeetingEnded,
  } = useMainViewAdapter();

  return (
    <Flex align="center" justify="space-between" width="100%">
      <Flex align="center" justify="flex-start" flex="1">
        <TimeDisplay />
      </Flex>
      <Flex align="center" justify="center" direction="row" flex="1" gap={4}>
        <MicrophoneButton
          isMicEnabled={isMicEnabled}
          handleMicButton={handleMicButton}
        />
        <WebCamButton
          isWebCamEnabled={isWebCamEnabled}
          handleWebCamButton={handleWebCamButton}
        />
        <ScreenShareButton
          isDisplaySharing={isDisplaySharing}
          handleScreenShareButton={handleScreenShareButton}
        />
        <LeaveButton
          onLeaveSession={onleaveSession}
          onEndSession={onEndSession}
          isMeetingEnded={isMeetingEnded}
        />
      </Flex>

      <Flex align="center" justify="flex-center" flex="1"></Flex>
    </Flex>
  );
};
