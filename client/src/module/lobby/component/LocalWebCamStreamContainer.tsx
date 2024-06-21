import React from "react";
import { Flex, IconButton, Avatar, Box } from "@chakra-ui/react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { useMediaService } from "../../media/useMediaService";
import ReactPlayer from "react-player";

export const LocalWebCamStreamContainer = () => {
  const {
    webCamStream,
    isWebCamEnabled,
    isMicEnabled,
    toggleMic,
    toggleWebCam,
  } = useMediaService();

  const aspectRatio = 16 / 9;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      border="2px"
      borderColor="gray.200"
      borderRadius="md"
      position="relative"
      overflow="hidden"
      maxWidth="100%"
      maxHeight="100%"
      aspectRatio={aspectRatio}
      mb="10%"
    >
      {isWebCamEnabled ? (
        <Box
          position="relative"
          width="100%"
          style={{
            paddingTop: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactPlayer
            url={webCamStream!}
            playing={true}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      ) : (
        <Avatar size="2xl" bgColor="gray.600" />
      )}
      <Flex
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        mb={4}
        gap={6}
      >
        <IconButton
          isRound
          icon={isMicEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
          bg="white"
          color={isMicEnabled ? "green.400" : "red.500"}
          onClick={toggleMic}
          variant="solid"
          size="md"
          aria-label={isMicEnabled ? "mic on" : "mic off"}
        />
        <IconButton
          isRound
          icon={isWebCamEnabled ? <FaVideo /> : <FaVideoSlash />}
          bg="white"
          color={isWebCamEnabled ? "green.400" : "red.500"}
          onClick={toggleWebCam}
          variant="outline"
          size="md"
          aria-label={isWebCamEnabled ? "camera on" : "camera off"}
        />
      </Flex>
    </Flex>
  );
};