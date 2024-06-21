import { useCallback, useEffect } from "react"
import { useMediaService } from "../../media/useMediaService"
import { ChannelType, ConnectionType, Member } from "../../members/types"
import { useMember } from "../../members/MemberServiceContext"
import {
  RTCClientHooksType,
  SocketHooksType,
  StartConnetionProps,
} from "../types"
import { useMeetingService } from "../../meeting/MeetingProvider"

export const useSocketHandler = (
  rtcClient: RTCClientHooksType,
  socketHooks: SocketHooksType
) => {
  const { makePeerConnection, handleOffer } = rtcClient
  const { listen, removeListener } = socketHooks
  const { setMeetingStatus } = useMeetingService()
  const {
    setLocalSocketId,
    addMember,
    setPeerConnection,
    getMember,
    members,
    getPeerConnection,
  } = useMember()
  const { micStream, webCamStream, isDisplaySharing, displayStream } =
    useMediaService()

  const handleMeetingCreated = useCallback(
    (data: any) => {
      setMeetingStatus("created")
    },
    [setMeetingStatus]
  )

  const handleIncomingOffer = useCallback(
    async (data: any) => {
      const { from, name, connectionPurpose } = data
      let member: Member | undefined = getMember(from)

      if (!member) {
        member = {
          name,
          memberId: from,
          peerConnections: null,
          isLocal: false,
        }
        addMember(member)
      }

      const peerConnection = getPeerConnection(from, connectionPurpose)

      if (!peerConnection) {
        const streams =
          connectionPurpose === "media"
            ? [webCamStream!, micStream!]
            : undefined

        const startConnectionProps: StartConnetionProps = {
          localMember: members[0],
          remoteMember: member,
          streams,
          connectionPurpose,
          data,
          dataChannelName:
            connectionPurpose === "media"
              ? ChannelType.SessionDetials
              : ChannelType.SharingDetails,
        }

        const { peerConnection, datachannel } = await makePeerConnection(
          startConnectionProps
        )
        setPeerConnection(from, peerConnection, connectionPurpose, datachannel)
      } else {
        handleOffer(peerConnection, data, connectionPurpose)
      }
    },
    [getMember, getPeerConnection, addMember, webCamStream, micStream, members, makePeerConnection, setPeerConnection, handleOffer]
  )

  const handleOfferAccepted = useCallback(
    (data: any) => {
      const { from, connectionPurpose, answer } = data
      const peerConnection = getPeerConnection(from, connectionPurpose)

      if (peerConnection) {
        peerConnection
          .setRemoteDescription(new RTCSessionDescription(answer))
          .catch((error) =>
            console.error("Error at handleOfferAccepted:", error)
          )
      } else {
        console.error("!! peerConnection is null")
      }
    },
    [getPeerConnection]
  )

  const handleConnectedToSocket = useCallback(
    (data: any) => {
      const { socketId } = data
      setLocalSocketId(socketId)
      const member: Member = {
        memberId: socketId,
        name: null,
        peerConnections: null,
        isLocal: true,
      }
      addMember(member)
    },
    [addMember, setLocalSocketId]
  )

  const handleOnNewUserJoined = useCallback(
    async (data: any) => {
      const { name, socketId } = data
      const connectionPurpose: ConnectionType = "media"
      const newMember: Member = {
        name,
        memberId: socketId,
        peerConnections: null,
        isLocal: false,
      }
      addMember(newMember)

      const streams: MediaStream[] = [webCamStream!, micStream!]
      const startConnectionProps: StartConnetionProps = {
        localMember: members[0],
        remoteMember: newMember,
        streams,
        connectionPurpose,
        data,
        dataChannelName: ChannelType.SessionDetials,
      }

      const { peerConnection, datachannel } = await makePeerConnection(
        startConnectionProps
      )
      setPeerConnection(
        socketId,
        peerConnection,
        connectionPurpose,
        datachannel
      )

      if (isDisplaySharing && displayStream) {
        const displayStartConnectionProps: StartConnetionProps = {
          localMember: members[0],
          remoteMember: newMember,
          streams: [displayStream],
          connectionPurpose: "display",
          data,
          dataChannelName: ChannelType.SharingDetails,
        }

        const {
          peerConnection: displayPeerConnection,
          datachannel: displayDatachannel,
        } = await makePeerConnection(displayStartConnectionProps)
        setPeerConnection(
          socketId,
          displayPeerConnection,
          "display",
          displayDatachannel
        )
      }
    },
    [
      addMember,
      displayStream,
      isDisplaySharing,
      makePeerConnection,
      members,
      micStream,
      setPeerConnection,
      webCamStream,
    ]
  )

  const handleIceCandidate = useCallback(
    async (data: any) => {
      const { from, connectionPurpose, iceCandidate } = data
      const peerConnection = getPeerConnection(from, connectionPurpose)

      if (peerConnection) {
        const candidate = new RTCIceCandidate(iceCandidate)
        peerConnection
          .addIceCandidate(candidate)
          .catch((error) =>
            console.error("@ Error handling ICE candidate:", error)
          )
      } else {
        console.error("@ handleIceCandidate: peerConnection is null")
      }
    },
    [getPeerConnection]
  )

  useEffect(() => {
    listen("meeting-created", handleMeetingCreated)
    listen("connected-to-socket", handleConnectedToSocket)
    listen("new-user-joined", handleOnNewUserJoined)
    listen("onOffer", handleIncomingOffer)
    listen("onAccepted", handleOfferAccepted)
    listen("onIceCandidate", handleIceCandidate)

    return () => {
      removeListener("meeting-created")
      removeListener("connected-to-socket")
      removeListener("new-user-joined")
      removeListener("onOffer")
      removeListener("onAccepted")
      removeListener("onIceCandidate")
      removeListener("onUserDisconnect")
    }
  }, [
    handleConnectedToSocket,
    handleIncomingOffer,
    handleMeetingCreated,
    handleOnNewUserJoined,
    handleOfferAccepted,
    handleIceCandidate,
    listen,
    removeListener,
  ])

  return {
    handleMeetingCreated,
    handleConnectedToSocket,
    handleOnNewUserJoined,
    handleIncomingOffer,
    handleOfferAccepted,
    handleIceCandidate,
  }
}
