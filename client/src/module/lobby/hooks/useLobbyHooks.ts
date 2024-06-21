import { useState } from "react";
import { useMeetingService } from "../../meeting/MeetingProvider";
import { createRandomMeetingId } from "../utils/createMeeting";
import { useMember } from "../../members/MemberServiceContext";
import { useRTC } from "../../rtc/RtcProvider";

export const useLobbyHooks = () => {
  const { send } = useRTC();
  const { setMeetingId } = useMeetingService();
  const [nameValidationError, setNameValidationError] = useState("");
  const [name, setName] = useState("");
  const { updateMember, localSocketId } = useMember();

  const updateName = () => {
    updateMember({ memberId: localSocketId!, updatedDetails: { name } });
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
    setNameValidationError("");
  };

  const validateName = () => {
    if (!name.trim()) {
      setNameValidationError("Name cannot be empty");
      return false;
    } else {
      updateName();
      return true;
    }
  };

  const handleCreateMeeting = () => {
    if (!validateName()) {
      return;
    }
    const meetingId = createRandomMeetingId();
    setMeetingId(meetingId);
    send("create-meeting", { meetingId, name: name });
  };

  return {
    handleCreateMeeting,
    name,
    handleNameChange,
    nameValidationError,
    validateName,
  };
};
