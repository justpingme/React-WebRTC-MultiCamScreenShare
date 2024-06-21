import { GridItem, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  MediaVideoStreamType,
  DisplayVideoStreamType,
  PinnedStreamType,
} from "../../../members/types";
import { StreamPlayer } from "../stream-player/StreamPlayer";
import { useMember } from "../../../members/MemberServiceContext";
interface StreamContainerProps {
  stream: MediaVideoStreamType | DisplayVideoStreamType;
  index?: number;
  isWebCamStream: boolean;
  canPinned: boolean;
  onPinned: (pinnedStream: PinnedStreamType) => void;
}

export const StreamContainer = (props: StreamContainerProps) => {
  const { stream, index, isWebCamStream, canPinned, onPinned } = props;
  const { getMember } = useMember();
  const member = getMember(stream.memberId);
  const isLocal = member?.isLocal;
  const aspectRatio = 16 / 9;

  return (
    <GridItem
      key={`${stream.stream.id}-${stream.memberId}-${index}`}
      textAlign="center"
      border="1px solid gray"
      borderRadius="10px"
      mx="4px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background="grey.800"
      position="relative"
      overflow="hidden"
      onClick={() =>
        stream.isEnabled &&
        canPinned &&
        onPinned({
          videoType: isWebCamStream ? "video" : "display",
          memberId: stream.memberId,
          id: stream.stream.id,
        })
      }
      cursor={stream.isEnabled && canPinned ? "pointer" : ""}
      maxWidth={"100%"}
      maxHeight={"100%"}
      aspectRatio={aspectRatio}
    >
      <StreamPlayer
        stream={stream.stream}
        name={member?.name!}
        isEnabled={stream.isEnabled}
      />

      <Stack
        direction="column"
        spacing={0}
        position="absolute"
        bottom={0}
        left={0}
        background="rgba(0, 0, 0, 0.5)"
        py="2"
        px="3"
        borderTopRightRadius="md"
        borderBottomLeftRadius="md"
      >
        <Text fontSize="md" color="white" textAlign={"left"}>
          {isLocal
            ? isWebCamStream
              ? "You"
              : "You are sharing"
            : `${member?.name} ${isWebCamStream ? "" : " - Sharing"}`}
        </Text>
      </Stack>
    </GridItem>
  );
};
