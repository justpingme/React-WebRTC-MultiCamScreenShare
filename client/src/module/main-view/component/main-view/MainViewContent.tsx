import { Flex } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useMember } from "../../../members/MemberServiceContext";
import { PinnedStreamType } from "../../../members/types";
import AudioPlayers from "../audio-element/AudioPlayer";
import { PinnedContainer } from "./PinnedContainer";
import { NormalGridView } from "./NormalGridView";

export const MainViewContent: React.FC = () => {
  const { remoteStreams } = useMember();
  const [pinnedStream, setPinnedStream] = useState<PinnedStreamType | null>();

  const handlePin = useCallback(
    (pinStream: PinnedStreamType) => {
      if (pinStream.id === pinnedStream?.id) {
        setPinnedStream(null);
      } else {
        setPinnedStream(pinStream);
      }
    },
    [pinnedStream?.id]
  );

  const totalStreams =
    remoteStreams.video.length +
    remoteStreams.display.filter((d) => d.isEnabled).length;

  const isPinned =
    pinnedStream &&
    totalStreams > 1 &&
    (remoteStreams.video.find(
      (video) => video.stream && pinnedStream.id === video.stream.id
    )?.isEnabled ||
      remoteStreams.display.find(
        (display) => display.stream && pinnedStream.id === display.stream.id
      )?.isEnabled);

  return (
    <Flex height="86%" width="100%" mb={4} px={2}>
      <AudioPlayers audioStreams={remoteStreams.audio} />
      {isPinned && pinnedStream ? (
        <PinnedContainer pinnedStream={pinnedStream} handlePin={handlePin} />
      ) : (
        <NormalGridView handlePin={handlePin} />
      )}
    </Flex>
  );
};
