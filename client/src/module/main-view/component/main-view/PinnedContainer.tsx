import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import {
  MediaVideoStreamType,
  DisplayVideoStreamType,
  PinnedStreamType,
  MediaAudioStreamType,
} from "../../../members/types";
import { StreamContainer } from "./StreamContainer";
import { useMember } from "../../../members/MemberServiceContext";
interface PinnedContainerProps {
  pinnedStream: PinnedStreamType;
  handlePin: (pinnedStream: PinnedStreamType) => void;
}

export const PinnedContainer = (props: PinnedContainerProps) => {
  const { pinnedStream, handlePin } = props;
  const { remoteStreams } = useMember();
  const totalStreams =
    remoteStreams.video.length +
    remoteStreams.display.filter(
      (display: DisplayVideoStreamType) => display.isEnabled
    ).length;
  const canPinned = totalStreams > 1;
  const filteredVideoStreams =
    pinnedStream &&
    remoteStreams.video.filter(
      (video: MediaVideoStreamType) =>
        video.stream && pinnedStream.id !== video.stream.id
    );

  const filteredDisplayStreams =
    pinnedStream &&
    remoteStreams.display.filter(
      (display: DisplayVideoStreamType) =>
        display.stream &&
        display.isEnabled &&
        pinnedStream.id !== display.stream.id
    );

  const pinnedVideoStream =
    pinnedStream &&
    remoteStreams.video.find(
      (video: MediaVideoStreamType) =>
        video.stream &&
        video.stream.id === pinnedStream.id &&
        video.isEnabled === true
    );

  const pinnedDisplayStream =
    pinnedStream &&
    remoteStreams.display.find(
      (display: DisplayVideoStreamType) =>
        display.stream &&
        display.isEnabled === true &&
        pinnedStream.id === display.stream.id
    );

  const columns = Math.ceil(totalStreams / 6);
  return (
    <>
      <Box width="14%" height="100%">
        <Grid
          templateColumns={`repeat(${columns}, 1fr)`}
          templateRows="repeat(6, 1fr)"
          gap={2}
          height="100%"
        >
          {filteredVideoStreams!.map(
            (video: MediaVideoStreamType, index: number) => (
              <StreamContainer
                stream={video}
                isWebCamStream={true}
                canPinned={canPinned}
                onPinned={handlePin}
              />
            )
          )}
          {filteredDisplayStreams!.map(
            (display: DisplayVideoStreamType, index: number) => (
              <StreamContainer
                stream={display}
                isWebCamStream={false}
                canPinned={canPinned}
                onPinned={handlePin}
              />
            )
          )}
        </Grid>
      </Box>
      <Box width="85%" height="100%">
        <StreamContainer
          stream={
            pinnedStream.videoType === "video"
              ? pinnedVideoStream!
              : pinnedDisplayStream!
          }
          isWebCamStream={pinnedStream.videoType === "video"}
          canPinned={canPinned}
          onPinned={handlePin}
        />
      </Box>
    </>
  );
};
