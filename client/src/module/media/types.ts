import { Dispatch, SetStateAction } from "react";

export interface MediaServiceState {
  isMicEnabled: boolean;
  toggleMic: () => void;
  setMicState: Dispatch<SetStateAction<boolean>>;
  isWebCamEnabled: boolean;
  toggleWebCam: () => Promise<MediaStream | undefined>;
  setWebCamState: Dispatch<SetStateAction<boolean>>;
  isDisplaySharing: boolean;
  toggleDisplaySharing: () => Promise<MediaStream | undefined>;
  setDisplaySharingState: Dispatch<SetStateAction<boolean>>;
  micStream: MediaStream | null;
  setMicStream: any;
  webCamStream: MediaStream | null;
  setWebCamStream: any;
  displayStream: MediaStream | null;
  setDisplayStream: Dispatch<SetStateAction<MediaStream | null>>;
  stopSharingAllMedia: () => void;
}
