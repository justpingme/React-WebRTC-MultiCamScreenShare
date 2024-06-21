import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMeetingService } from "../../../meeting/MeetingProvider";
import { joinMeetingUtils } from "./utils/joinMeetingUtils";
import { useJoinMeetingHooks } from "./hooks/useJoinMeetingHooks";

interface JoinMeetingProps {
  validateName: () => boolean;
}

export const JoinMeeting: React.FC<JoinMeetingProps> = ({ validateName }) => {
  const [isJoinMeetingDialogOpen, setJoinMeetingDialogOpen] =
    useState<boolean>(false);
  
  const { setMeetingId } = useMeetingService();
  const [ textMeetingId, setTextMeetingId ] = useState<string>('')
  const { handlemeetingIdChange, validatemeetingId } = joinMeetingUtils();
  const { joinMeetingSender, validationError, setValidationError } = useJoinMeetingHooks()

  const onClick = () => {
    if (!validateName()) {
      return;
    }
    setJoinMeetingDialogOpen(true);
  };

  const onChange = (event: any) => {
    setValidationError("");
    const id = handlemeetingIdChange(event);
    setTextMeetingId(id);
  };

  const handleOnJoin = () => {
    if (!validatemeetingId(textMeetingId)) {
      setValidationError("Invalid Meeting ID");
      return;
    }
    setValidationError("");
    const meetingId = textMeetingId.replaceAll("-", "")
    setMeetingId(meetingId)
    joinMeetingSender(meetingId)
  };

  return (
    <>
      <Button ml={10} colorScheme="teal" onClick={onClick}>
        Join Meeting
      </Button>
      <Modal
        isOpen={isJoinMeetingDialogOpen}
        onClose={() => setJoinMeetingDialogOpen(false)}
      >
        <ModalOverlay />
        <ModalContent
          style={{
            position: "absolute",
            top: "30%",
          }}
        >
          <ModalHeader>Join Meeting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!validationError}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                maxLength={11}
                type="text"
                id="meeting-id"
                placeholder="Enter Meeting ID (e.g., 123-456-789)"
                value={textMeetingId}
                onChange={onChange}
              />
              <FormErrorMessage>{validationError}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleOnJoin}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
