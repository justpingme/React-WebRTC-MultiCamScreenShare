import { useState } from "react";
import { MeetingServiceTypes, meetingStatus } from "../types";

export const useMeeting = (): MeetingServiceTypes => {
  const [meetingId, setMeetingId] = useState<string>("");
  const [meetingStatus, setMeetingStatus] =
    useState<meetingStatus>("not-created");
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);

  return { meetingId, setMeetingId, meetingStatus, setMeetingStatus, isOrganizer, setIsOrganizer};
};
