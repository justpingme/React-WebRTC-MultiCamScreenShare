import React from "react"
import { Box, Button, Text, useClipboard } from "@chakra-ui/react"
import { useMeetingService } from "../../meeting/MeetingProvider"
import { useNavigate } from "react-router-dom"
import { useRTC } from "../../rtc/RtcProvider"
import { useMediaService } from "../../media/useMediaService"
import { useMember } from "../../members/MemberServiceContext"

export const StartMeeting = () => {
  const { meetingId, setIsOrganizer } = useMeetingService()
  const { hasCopied, onCopy } = useClipboard(meetingId)
  const { members, updateStream } = useMember()
  const { send } = useRTC()
  const navigate = useNavigate()
  const { webCamStream, isWebCamEnabled } = useMediaService()

  const startMeeting = () => {
    send("start-meeting", { meetingId })
    setIsOrganizer(true)
    updateLocalStream()
    navigate(`/${meetingId}`)
  }

  const updateLocalStream = () => {
    if (members.length > 0) {
      const { memberId, name } = members[0]
      updateStream({
        memberId,
        connectionType: "media",
        streamType: "video",
        stream: webCamStream!,
        isEnabled: isWebCamEnabled,
      })
    }
  }

  return (
    <Box>
      <Text textAlign="start" mb={5}>
        Hi {members[0]?.name}
      </Text>
      <Text mb={4} color="gray.800">
        Meeting ID: {meetingId}
      </Text>
      <Text mb={4} color="gray.800">
        Copy this ID and share it with others.
      </Text>
      <Button size="sm" onClick={onCopy} variant="outline" mb={2}>
        {hasCopied ? "Copied" : "Copy ID"}
      </Button>
      <Box mt={4} p={2} bg="teal.50" borderRadius="md">
        <Text fontSize="sm" color="teal.800">
          Meeting created! Share the meeting ID with others. Only start the
          meeting when ready.
        </Text>
      </Box>
      <Button mt={4} colorScheme="teal" onClick={startMeeting}>
        Start Meeting
      </Button>
    </Box>
  )
}
