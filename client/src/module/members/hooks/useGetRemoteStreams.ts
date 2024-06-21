import { useRef, useState, useCallback } from "react";
import {
  MediaAudioStreamType,
  MediaVideoStreamType,
  DisplayVideoStreamType,
  ConnectionType,
  UpdateStreamProps,
} from "../types";

export const useGetRemoteStreams = () => {
  const remoteStreams = useRef<{
    audio: MediaAudioStreamType[];
    video: MediaVideoStreamType[];
    display: DisplayVideoStreamType[];
  }>({ audio: [], video: [], display: [] });

  const [_, forceUpdate] = useState({});

  const removeRemoteStream = useCallback(
    (memberId: string, connectionType: ConnectionType) => {
      if (connectionType === "media") {
        remoteStreams.current = {
          audio: remoteStreams.current.audio.filter(
            (s) => s.memberId !== memberId
          ),
          video: remoteStreams.current.video.filter(
            (s) => s.memberId !== memberId
          ),
          display: remoteStreams.current.display,
        };
      } else if (connectionType === "display") {
        remoteStreams.current = {
          audio: remoteStreams.current.audio,
          video: remoteStreams.current.video,
          display: remoteStreams.current.display.filter(
            (s) => s.memberId !== memberId
          ),
        };
      }
      forceUpdate({});
    },
    []
  );

  const updateRemoteStream = useCallback((props: UpdateStreamProps) => {
    const { memberId, connectionType, streamType, stream, isEnabled } = props;

    const existingStreamIndex = remoteStreams.current[streamType].findIndex(
      (s) => s.memberId === memberId
    );

    if (existingStreamIndex !== -1) {
      remoteStreams.current = {
        ...remoteStreams.current,
        [streamType]: remoteStreams.current[streamType].map((s, index) =>
          index === existingStreamIndex ? { ...s, stream, isEnabled } : s
        ),
      };
    } else {
      const streamProps = { memberId, stream, isEnabled };
      remoteStreams.current = {
        ...remoteStreams.current,
        [streamType]: [...remoteStreams.current[streamType], streamProps],
      };
    }

    forceUpdate({});
  }, []);

  const resetRemoteStreams = useCallback(() => {
    remoteStreams.current = { audio: [], video: [], display: [] };
    forceUpdate({});
  }, []);

  return {
    remoteStreams: remoteStreams.current,
    updateRemoteStream,
    removeRemoteStream,
    resetRemoteStreams,
  };
};
