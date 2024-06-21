import { useCallback, useEffect, useState } from "react";
import { MediaServiceState } from "../types";
import { getVideoMediaStream } from "../service/video/videoMediaStream";
import { getAudioMediaStream } from "../service/audio/audioMediaStream";
import { getDisplayMediaStream } from "../service/display/displayMediaStream";

export const useMediaService = (): MediaServiceState => {
  const [isMicEnabled, setMicState] = useState<boolean>(true);
  const [isWebCamEnabled, setWebCamState] = useState<boolean>(true);
  const [isDisplaySharing, setDisplaySharingState] = useState<boolean>(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [webCamStream, setWebCamStream] = useState<MediaStream | null>(null);
  const [displayStream, setDisplayStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initializeMediaStream = async () => {
      const videoStream = await getVideoMediaStream();
      const audioStream = await getAudioMediaStream();
      setMicStream(audioStream);
      setWebCamStream(videoStream);
    };
    initializeMediaStream();
  }, []);

  const toggleMic = useCallback(() => {
    micStream &&
      micStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMicEnabled;
        track.stop();
      });
    setMicState((prev) => !prev);
  }, [isMicEnabled, micStream]);

  const toggleWebCam = useCallback(async (): Promise<
    MediaStream | undefined
  > => {
    if (isWebCamEnabled && webCamStream) {
      setWebCamState((prev) => !prev);
      webCamStream.getVideoTracks()[0].stop();
      return;
    } else {
      const videoStream = await getVideoMediaStream();
      setWebCamStream(videoStream);
      setWebCamState((prev) => !prev);
      if (webCamStream) {
        webCamStream.getVideoTracks()[0].enabled = true;
      }
      return videoStream;
    }
  }, [isWebCamEnabled, webCamStream]);

  const stopScreenShare = useCallback(() => {
    setDisplaySharingState((prev) => !prev);
    if (displayStream) {
      displayStream.getVideoTracks()[0].stop();
      displayStream.getVideoTracks()[0].enabled = false;
    }
    setDisplayStream(null);
  }, [displayStream]);

  const toggleDisplaySharing = useCallback(async (): Promise<
    MediaStream | undefined
  > => {
    if (isDisplaySharing) {
      stopScreenShare();
      return;
    } else {
      const displayStream = await getDisplayMediaStream();
      if (!displayStream) return;
      displayStream.getVideoTracks()[0].addEventListener("ended", () => {
        stopScreenShare();
      });
      setDisplayStream(displayStream);
      setDisplaySharingState((prev) => !prev);
      return displayStream;
    }
  }, [isDisplaySharing, stopScreenShare]);

  const stopSharingAllMedia = useCallback(() => {
    if (isMicEnabled) {
      toggleMic();
    }
    if (isWebCamEnabled) {
      toggleWebCam();
    }
    if (isDisplaySharing) {
      stopScreenShare();
    }
  }, [
    isDisplaySharing,
    isMicEnabled,
    isWebCamEnabled,
    stopScreenShare,
    toggleMic,
    toggleWebCam,
  ]);

  return {
    isMicEnabled,
    toggleMic,
    setMicState,
    isWebCamEnabled,
    toggleWebCam,
    setWebCamState,
    isDisplaySharing,
    toggleDisplaySharing,
    setDisplaySharingState,
    micStream,
    setMicStream,
    webCamStream,
    setWebCamStream,
    displayStream,
    setDisplayStream,
    stopSharingAllMedia,
  };
};
