import React, { ReactNode, createContext, useContext } from "react";
import { useMeeting } from "./hooks/useMeeting";
import { MeetingServiceTypes } from "./types";

const MettingServiceContext = createContext<MeetingServiceTypes | undefined>(
  undefined
);

export const useMeetingService = (): MeetingServiceTypes => {
  const context = useContext(MettingServiceContext);
  if (context === undefined) {
    throw new Error(
      "useMeetingService must be used within a MeetingServiceProvider"
    );
  }
  return context;
};

export const MeetingServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const meetingService = useMeeting();

  return (
    <MettingServiceContext.Provider value={meetingService}>
      {children}
    </MettingServiceContext.Provider>
  );
};
