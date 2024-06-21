import { useMember } from "../../members/MemberServiceContext";
import { ConnectionType, Member } from "../../members/types";
import { iceServers } from "../config/config";
import { SocketSend } from "../types";

export const useRtcClientHandler = (send: SocketSend) => {
  const { onTrackUpdateTrack, setupDataChannel, disconnectPeerconnection } = useMember();

  const createPeerConnection = (): RTCPeerConnection => {
    return new RTCPeerConnection({ iceServers });
  };

  const handleIceCandidate = async (
    event: RTCPeerConnectionIceEvent,
    remoteMember: Member,
    connectionPurpose: string
  ) => {
    if (event.candidate) {
      send("iceCandidate", {
        iceCandidate: event.candidate,
        to: remoteMember.memberId,
        connectionPurpose,
      });
    }
  };

  const setupTrackListeners = (
    ev: RTCTrackEvent,
    remoteMember: Member,
    connectionPurpose: string
  ) => {
    ev.track.onmute = () => onTrackUpdateTrack(ev, remoteMember, connectionPurpose, false);
    ev.track.onunmute = () => onTrackUpdateTrack(ev, remoteMember, connectionPurpose, true);
  };

  const setupListeners = (
    peerConnection: RTCPeerConnection,
    localMember: Member,
    remoteMember: Member,
    connectionPurpose: string
  ) => {
    peerConnection.onicecandidate = (ev: RTCPeerConnectionIceEvent) => {
      if (peerConnection.signalingState === "stable") {
        handleIceCandidate(ev, remoteMember, connectionPurpose);
      }
    };

    peerConnection.ontrack = (ev: RTCTrackEvent) => setupTrackListeners(ev, remoteMember, connectionPurpose);

    peerConnection.ondatachannel = (ev: RTCDataChannelEvent) => {
      setupDataChannel(remoteMember.memberId, ev.channel);
    };

    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === "failed" || peerConnection.connectionState === "closed") {
        disconnectPeerconnection(remoteMember.memberId, connectionPurpose as ConnectionType);
      }
    };

    peerConnection.onnegotiationneeded = async () => {
      await makeOffer(peerConnection, localMember, remoteMember, connectionPurpose);
    };
  };

  const createDataChannel = (
    peerConnection: RTCPeerConnection,
    dataChannelName: string,
    remoteMember: Member
  ): RTCDataChannel => {
    const dataChannel = peerConnection.createDataChannel(dataChannelName.toString());
    setupDataChannel(remoteMember.memberId, dataChannel);
    return dataChannel;
  };

  const addTracks = (
    peerConnection: RTCPeerConnection,
    streams: MediaStream[] | undefined
  ) => {
    streams?.forEach((stream) => {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
    });
  };

  const makeOffer = async (
    peerConnection: RTCPeerConnection,
    localMember: Member,
    remoteMember: Member,
    connectionPurpose: string
  ) => {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      send("offer", {
        offer,
        to: remoteMember.memberId,
        name: localMember.name!,
        connectionPurpose,
      });
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const handleOffer = async (
    peerConnection: RTCPeerConnection,
    data: {
      offer: RTCSessionDescriptionInit;
      from: any;
      name: string;
      connectionPurpose: string;
    },
    connectionPurpose: string
  ) => {
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();

      await peerConnection.setLocalDescription(answer);
      send("answer", { answer, to: data.from, connectionPurpose });
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  return {
    createPeerConnection,
    setupListeners,
    createDataChannel,
    addTracks,
    makeOffer,
    handleOffer,
  };
};
