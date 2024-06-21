import { useCallback, useRef, useState } from "react";
import { ConnectionType, Member, UpdateMemberProps } from "../types";

export const useGetMembers = () => {
  const members = useRef<Member[]>([]);
  const [_, forceUpdate] = useState({});

  const addMember = useCallback((member: Member) => {
    members.current = [...members.current, member];
    forceUpdate({});
  }, []);

  const getMember = useCallback((memberId: string): Member | undefined => {
    return members.current.filter((m) => m.memberId === memberId)[0];
  }, []);

  const removeMember = (memberId: string): void => {
    members.current = members.current.filter((m) => m.memberId !== memberId);
    forceUpdate({});
  };

  const resetMembers = useCallback(() => {
    members.current = [];
    forceUpdate({});
  }, []);

  const updateMember = useCallback((props: UpdateMemberProps) => {
    const { memberId, updatedDetails } = props;
    const index = members.current.findIndex((m) => m.memberId === memberId);
    if (index !== -1) {
      const updatedMember: Member = {
        ...members.current[index],
        ...updatedDetails,
      };
      members.current = [
        ...members.current.slice(0, index),
        updatedMember,
        ...members.current.slice(index + 1),
      ];
    }

    forceUpdate({});
  }, []);

  const setPeerConnection = useCallback(
    (
      memberId: string,
      peerConnection: RTCPeerConnection,
      connectionType: ConnectionType,
      rtcDataChannel: RTCDataChannel
    ): void => {
      console.log("!!!Set peer connection", members.current);
      members.current = members.current.map((member) => {
        if (member.memberId === memberId) {
          const updatedPeerConnections = [
            ...(member.peerConnections || []),
            {
              connectionType,
              peerConnection,
              rtcDataChannel,
            },
          ];
          return { ...member, peerConnections: updatedPeerConnections };
        }
        return member;
      });
      forceUpdate({});
    },
    []
  );

  const getPeerConnection = useCallback(
    (memberId: string, type: ConnectionType): RTCPeerConnection | null => {
      const member = members.current.find((m) => m.memberId === memberId);
      if (member) {
        const peerConnection = member.peerConnections?.find(
          (peer) => peer.connectionType === type
        );
        return peerConnection ? peerConnection.peerConnection : null;
      }
      return null;
    },
    []
  );

  return {
    addMember,
    members,
    getMember,
    removeMember,
    updateMember,
    setPeerConnection,
    getPeerConnection,
    resetMembers,
  };
};
