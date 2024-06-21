import { useCallback, useState } from "react"
import {
  ConnectionType,
  Member,
  MemberServiceState,
  UpdateStreamProps,
} from "../types"
import { useGetRemoteStreams } from "./useGetRemoteStreams"
import { useGetMembers } from "./useGetMembers"
import { useMediaService } from "../../media/useMediaService"
import { ChatMessage } from "../../main-view/component/chat/Types"

export const useMemberHooks = (): MemberServiceState => {
  const [chatMessage, setChatMessage] = useState<ChatMessage[]>([])
  const [isMeetingEnded, setMeetingEnded] = useState<boolean>(false)
  const [localSocketId, setLocalSocketId] = useState<string>("")

  const {
    addMember,
    members,
    getMember,
    removeMember,
    updateMember,
    setPeerConnection,
    getPeerConnection,
    resetMembers,
  } = useGetMembers()
  const { stopSharingAllMedia } = useMediaService()

  const {
    remoteStreams,
    updateRemoteStream,
    removeRemoteStream,
    resetRemoteStreams,
  } = useGetRemoteStreams()

  const updateStream = useCallback(
    (props: UpdateStreamProps): void => {
      updateRemoteStream({ ...props })
    },
    [updateRemoteStream]
  )

  const closeAllConnection = useCallback(() => {
    members.current.forEach((member) => {
      if (member.peerConnections) {
        member.peerConnections.forEach((peerConnection) => {
          peerConnection.peerConnection.close()
        })
      }
    })
    resetMembers()
    resetRemoteStreams()
    setChatMessage([])
    stopSharingAllMedia()
  }, [members, resetMembers, resetRemoteStreams, stopSharingAllMedia])

  const sendMessage = useCallback(
    (payload: any) => {
      members.current.forEach((member) => {
        member.peerConnections
          ?.filter((peer) => peer.connectionType === "media")
          .forEach((peer) => {
            if (peer.rtcDataChannel.readyState === "open") {
              peer.rtcDataChannel.send(JSON.stringify(payload))
            }
          })
      })
    },
    [members]
  )

  const disconnectPeerconnection = useCallback(
    (memberId: string, connectionType: ConnectionType) => {
      const member = members.current.find((m) => m.memberId === memberId)
      if (!member) return

      const peerConnection = getPeerConnection(memberId, connectionType)
      if (peerConnection) {
        peerConnection.close()
      }

      if (connectionType === "display") {
        removeRemoteStream(memberId, connectionType)
      } else if (connectionType === "media") {
        removeMember(memberId)
        removeRemoteStream(memberId, connectionType)
      }
    },
    [getPeerConnection, members, removeMember, removeRemoteStream]
  )

  const onTrackUpdateTrack = useCallback(
    (
      ev: any,
      remoteMember: Member,
      connectionPurpose: string,
      isEnabled: boolean
    ) => {
      const stream = ev.streams[0]
      if (!stream) return

      const audioTracks = stream.getAudioTracks()
      const videoTracks = stream.getVideoTracks()
      if (audioTracks.length) {
        const audioStream = new MediaStream([audioTracks[0]])
        updateStream({
          memberId: remoteMember.memberId,
          connectionType: connectionPurpose as ConnectionType,
          streamType: "audio",
          stream: audioStream,
          isEnabled,
        })
      }

      if (videoTracks.length) {
        const videoStream = new MediaStream([videoTracks[0]])
        updateStream({
          memberId: remoteMember.memberId,
          connectionType: connectionPurpose as ConnectionType,
          streamType: connectionPurpose === "media" ? "video" : "display",
          stream: videoStream,
          isEnabled,
        })
      }
    },
    [updateStream]
  )

  const handleMessage = useCallback(
    (payload: any, remotedId: string) => {
      if (payload.type === "chat") {
        const message: ChatMessage = payload.message
        setChatMessage((prevMessages) => [...prevMessages, message])
      } else if (payload.type === "leave") {
        disconnectPeerconnection(remotedId, "display")
        disconnectPeerconnection(remotedId, "media")
      } else if (payload.type === "session-ended") {
        closeAllConnection()
        setMeetingEnded(true)
      }
    },
    [closeAllConnection, disconnectPeerconnection, setMeetingEnded]
  )

  const setupDataChannel = useCallback(
    (remoteId: string, dataChannel: RTCDataChannel) => {
      dataChannel.onopen = (event: Event) => {
        console.log(`Data channel with ${remoteId} is open`, event)
      }

      dataChannel.onclose = (event: Event) => {
        console.log(`Data channel with ${remoteId} is closed`, event)
      }

      dataChannel.onmessage = (event: MessageEvent<any>) => {
        console.log(`Message received from ${remoteId}: `, event.data)
        handleMessage(JSON.parse(event.data), remoteId)
      }
    },
    [handleMessage]
  )

  const leaveSession = useCallback(() => {
    const payload = {
      type: "leave",
      message: "User has left the session",
    }
    sendMessage(payload)
    closeAllConnection()
  }, [closeAllConnection, sendMessage])

  const endSession = useCallback(() => {
    sendMessage({ type: "session-ended", message: "Session has ended" })
    closeAllConnection()
    setMeetingEnded(true)
  }, [closeAllConnection, sendMessage, setMeetingEnded])

  return {
    localSocketId,
    setLocalSocketId,
    members: members.current,
    addMember,
    getMember,
    removeMember,
    updateMember,
    setPeerConnection,
    getPeerConnection,
    updateStream,
    remoteStreams,
    removeRemoteStream,
    disconnectPeerconnection,
    chatMessage,
    setChatMessage,
    setupDataChannel,
    leaveSession,
    sendMessage,
    endSession,
    isMeetingEnded,
    onTrackUpdateTrack,
  }
}
