import { Button } from "@chakra-ui/react";
import React from "react";

interface CreateMeetingProps {
  onClick: ()=> void
}
export const CreateMeeting: React.FC<CreateMeetingProps> = ({ onClick }) => {
  return (
    <Button colorScheme="teal" onClick={onClick}>
      Create Meeting
    </Button>
  );
};
