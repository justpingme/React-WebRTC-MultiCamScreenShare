import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMeetingService } from "../../../../meeting/MeetingProvider";
import { useMember } from "../../../../members/MemberServiceContext";
import { useRTC } from "../../../../rtc/RtcProvider";
import { useMediaService } from "../../../../media/useMediaService";

export const useJoinMeetingHooks = () => {
  const { setMeetingStatus } = useMeetingService();
  const { send, listen } = useRTC();
  const { members, updateStream } = useMember();
  const { webCamStream, isWebCamEnabled } = useMediaService();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<string>("");

  const joinMeetingSender = (id: string) => {
    send("join-meeting", { meetingId: id, name: members[0]?.name });
    listen("join-meeting-response", listenJoinMeetingResponse);
  };

  const listenJoinMeetingResponse = (data: any) => {
    const { status, meetingId } = data;

    switch (status) {
      case "invalid":
        setValidationError("Invalid meeting id");
        break;
      case "created":
        setValidationError("Meeting yet to start!");
        break;
      case "ended":
        setValidationError("Meeting ended!");
        break;
      case "started":
        setValidationError("");
        handleMeetingStarted(data);
        break;
      default:
        break;
    }
  };

  const handleMeetingStarted = (data: any) => {
    const { meetingId, status } = data;
    updateStream({
      memberId: members[0]?.memberId,
      connectionType: "media",
      streamType: "video",
      stream: webCamStream!,
      isEnabled: isWebCamEnabled,
    });
    navigate(`/${meetingId}`);
    setMeetingStatus(status);
  };

  return {
    joinMeetingSender,
    listenJoinMeetingResponse,
    validationError,
    setValidationError,
  };
};
