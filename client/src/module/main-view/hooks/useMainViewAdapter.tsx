import { useCallback, useEffect } from "react"
import { useMediaService } from "../../media/useMediaService"
import { useMember } from "../../members/MemberServiceContext"
import { useRTC } from "../../rtc/RtcProvider"
import { StartConnetionProps } from "../../rtc/types"
import { ChannelType } from "../../members/types"
export const useMainViewAdapter = () => {
  const { webCamStream } = useMediaService()
  const {
    members,
    updateStream,
    setPeerConnection,
    getPeerConnection,
    leaveSession,
    endSession,
    isMeetingEnded,
  } = useMember()

  const onleaveSession = useCallback(() => {
    leaveSession()
  }, [leaveSession])

  const onEndSession = useCallback(() => {
    endSession()
  }, [endSession])
  const {
    isWebCamEnabled,
    toggleWebCam,
    toggleMic,
    toggleDisplaySharing,
    displayStream,
    isDisplaySharing,
  } = useMediaService()
  const { makePeerConnection } = useRTC()

  const handleMicButton = () => toggleMic()

  const handleWebCamButton = useCallback(async () => {
    if (isWebCamEnabled) {
      toggleWebCam()
      updateStream({
        memberId: members[0].memberId,
        connectionType: "media",
        streamType: "video",
        stream: webCamStream!,
        isEnabled: false,
      })
    } else {
      const stream = await toggleWebCam()
      if (!stream) {
        return
      }
      updateStream({
        memberId: members[0].memberId,
        connectionType: "media",
        streamType: "video",
        stream: stream,
        isEnabled: true,
      })

      members.forEach(async (member) => {
        const mediaPeerConnection = member.peerConnections?.find(
          (peer) => peer.connectionType === "media"
        )

        const videoTrack = stream.getVideoTracks()[0]

        if (mediaPeerConnection?.peerConnection && webCamStream) {
          const videoSender = mediaPeerConnection.peerConnection
            .getSenders()
            .find((e) => e.track?.kind === "video")
          if (videoSender == null && webCamStream) {
            mediaPeerConnection.peerConnection.addTrack(
              videoTrack,
              webCamStream
            )
          } else {
            if (videoSender) {
              try {
                await videoSender.replaceTrack(videoTrack)
              } catch (e) {}
            }
          }
        }
      })
    }
  }, [isWebCamEnabled, members, toggleWebCam, updateStream, webCamStream])

  useEffect(() => {
    if (!isDisplaySharing && members.length) {
      updateStream({
        memberId: members[0].memberId,
        connectionType: "display",
        streamType: "display",
        isEnabled: false,
      })
    }
  }, [isDisplaySharing, updateStream, members])

  const startScreenShareConnection = useCallback(
    async (stream: MediaStream) => {
      const videoTrack = stream.getVideoTracks()[0]
      members.forEach(async (member) => {
        if (member.isLocal) return
        const screenSharePeerConnection = getPeerConnection(
          member.memberId,
          "display"
        )
        if (screenSharePeerConnection && stream) {
          // console.log("*** All ready peer connection exists for screen share");
          const videoSender = screenSharePeerConnection
            .getSenders()
            .find((e: any) => e.track?.kind === "video")
          if (!videoSender && stream) {
            // console.log("*** No video sender adding new track", videoTrack);
            screenSharePeerConnection.addTrack(videoTrack, stream)
          } else {
            if (stream) {
              // console.log("*** Updating the track");
              videoSender?.replaceTrack(videoTrack)
            }
          }
        } else {
          const startConnectionProps: StartConnetionProps = {
            localMember: members[0],
            remoteMember: member,
            streams: [stream],
            connectionPurpose: "display",
            data: {},
            dataChannelName: ChannelType.SharingDetails,
          }
          const { peerConnection, datachannel } = await makePeerConnection(
            startConnectionProps
          )
          setPeerConnection(
            member.memberId,
            peerConnection,
            "display",
            datachannel
          )
        }
      })
    },
    [getPeerConnection, members, setPeerConnection, makePeerConnection]
  )

  const handleScreenShareButton = useCallback(async () => {
    if (displayStream) {
      toggleDisplaySharing()
    } else {
      const stream = await toggleDisplaySharing()
      if (!stream) {
        return
      }

      updateStream({
        memberId: members[0].memberId,
        connectionType: "display",
        streamType: "display",
        stream,
        isEnabled: true,
      })
      await startScreenShareConnection(stream)
    }
  }, [
    displayStream,
    members,
    startScreenShareConnection,
    toggleDisplaySharing,
    updateStream,
  ])

  return {
    handleMicButton,
    handleWebCamButton,
    handleScreenShareButton,
    onleaveSession,
    onEndSession,
    isMeetingEnded,
  }
}
