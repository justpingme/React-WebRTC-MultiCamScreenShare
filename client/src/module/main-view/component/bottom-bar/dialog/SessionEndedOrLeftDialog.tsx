import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
interface SessionEndedOrLeftDialogProps {
  isMeetingEnded: boolean;
  isLeftMeeting: boolean;
}
export const SessionEndedOrLeftDialog = (
  props: SessionEndedOrLeftDialogProps
) => {
  const { isMeetingEnded, isLeftMeeting } = props;

  const onClose = () => {
    console.log("close");
    window.close();
  };
  return (
    <Modal
      isOpen={isMeetingEnded || isLeftMeeting}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xs"
    >
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        color={"white"}
        style={{
          position: "absolute",
          top: "30%",
        }}
      >
        <ModalHeader>
          {isMeetingEnded
            ? "Session has been ended."
            : "You have left the session."}
        </ModalHeader>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
