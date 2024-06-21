import { Dispatch, SetStateAction } from "react";

export type meetingStatus = "started" | "not-started" | "created" | "ended" | "not-created";

export interface MeetingServiceTypes {
  meetingId: string;
  setMeetingId: Dispatch<SetStateAction<string>>;
  meetingStatus: meetingStatus;
  setMeetingStatus: Dispatch<SetStateAction<meetingStatus>>;
  isOrganizer: boolean;
  setIsOrganizer: Dispatch<SetStateAction<boolean>>;
}
