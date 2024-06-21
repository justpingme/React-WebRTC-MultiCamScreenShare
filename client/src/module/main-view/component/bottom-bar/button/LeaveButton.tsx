import { CloseIcon } from "@chakra-ui/icons";
import { useDisclosure, Tooltip, IconButton } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { SessionEndedOrLeftDialog } from "../dialog/SessionEndedOrLeftDialog";
import { LeaveOrEndSessionDialog } from "../dialog/LeaveOrEndSessionDialog";
import { useMeetingService } from "../../../../meeting/MeetingProvider";
interface LeaveButtonProps {
  onLeaveSession: () => void;
    onEndSession: () => void;
    isMeetingEnded: boolean
}
export const LeaveButton = ({ onLeaveSession, onEndSession, isMeetingEnded }: LeaveButtonProps) => {
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const {
    isOpen: isResultOpen,
    onOpen: onResultOpen,
    onClose: onResultClose,
  } = useDisclosure();
  const { isOrganizer } = useMeetingService();
  const [resultMessage, setResultMessage] = useState("");

  const handleConfirm = useCallback(() => {
    if (isOrganizer) {
      setResultMessage("Session has been ended.");
        onEndSession()
    } else {
      setResultMessage("You have left the session.");
      onLeaveSession();
    }
    onConfirmClose();
    onResultOpen();
  }, [isOrganizer, onConfirmClose, onEndSession, onLeaveSession, onResultOpen]);
    
    useEffect(() => { 

    },[])
  return (
    <>
      <Tooltip
        label={isOrganizer ? "End Session" : "Leave Session"}
        hasArrow
        bg="white"
        color="black"
      >
        <IconButton
          isRound={true}
          icon={<CloseIcon />}
          bg="red"
          _hover={{ background: "red" }}
          color={"white"}
          onClick={onConfirmOpen}
          variant="solid"
          fontSize="18px"
          aria-label={isOrganizer ? "End Session" : "Leave Session"}
        />
      </Tooltip>
      <LeaveOrEndSessionDialog
        isOpen={isConfirmOpen}
        isOrgnizer={isOrganizer}
        onClose={onConfirmClose}
        onConfirm={handleConfirm}
      />
      <SessionEndedOrLeftDialog isMeetingEnded={isMeetingEnded} isLeftMeeting={isResultOpen} />
    </>
  );
};
