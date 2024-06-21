import { ChatMessage } from "../main-view/component/chat/Types";

export type ConnectionType = "media" | "display";

export type MediaAudioStreamType = {
  memberId: string;
  stream: MediaStream;
  isEnabled: boolean;
};

export enum ChannelType {
  SessionDetials,
  SharingDetails,
}

export type MediaVideoStreamType = {
  memberId: string;
  stream: MediaStream;
  isEnabled: boolean;
};

export type DisplayVideoStreamType = {
  memberId: string;
  stream: MediaStream;
  isEnabled: boolean;
};

export type PeerConnection = {
  peerConnection: RTCPeerConnection;
  connectionType: ConnectionType;
  rtcDataChannel: RTCDataChannel;
};

export interface Member {
  name: string | null;
  memberId: string; // socket_connection_id
  peerConnections: PeerConnection[] | null;
  isLocal: boolean;
}

export interface UpdateStreamProps {
  memberId: string;
  connectionType: ConnectionType;
  streamType: "display" | "audio" | "video";
  isEnabled: boolean;
  stream?: MediaStream;
}

export interface UpdateMemberProps {
  memberId: string;
  updatedDetails: Partial<Member>;
}

export interface MemberServiceState {
  localSocketId: string | null;
  setLocalSocketId: (socketId: string) => void;
  members: Member[];
  addMember: (member: Member) => void;
  getMember: (memberId: string) => Member | undefined;
  removeMember: (memberId: string) => void;
  updateMember: (props: UpdateMemberProps) => void;
  setPeerConnection: (
    memberId: string,
    peerConnection: RTCPeerConnection,
    type: ConnectionType,
    rtcDataChannel: RTCDataChannel
  ) => void;
  getPeerConnection: (
    memberId: string,
    type: ConnectionType
  ) => RTCPeerConnection | null;
  updateStream: (props: UpdateStreamProps) => void;
  remoteStreams: {
    audio: MediaAudioStreamType[];
    video: MediaVideoStreamType[];
    display: DisplayVideoStreamType[];
  };
  removeRemoteStream: (
    memberId: string,
    connectionType: ConnectionType
  ) => void;
  disconnectPeerconnection: (
    memberId: string,
    connectionType: ConnectionType
  ) => void;
  chatMessage: ChatMessage[];
  setChatMessage: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setupDataChannel: (remoteId: string, dataChannel: RTCDataChannel) => void;
  leaveSession: () => void;
  sendMessage: (payload: any) => void;
  endSession: () => void;
  isMeetingEnded: boolean
  onTrackUpdateTrack: (ev: any, remoteMember: Member, connectionPurpose: string, isEnabled: boolean) => void
}

export interface PinnedStreamType {
  videoType: "video" | "display";
  memberId: string;
  id: string;
}