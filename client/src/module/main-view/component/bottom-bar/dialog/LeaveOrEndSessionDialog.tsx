import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react";
import React from "react";

interface LeaveOrEndSessionDialogProps {
  isOpen: boolean;
  isOrgnizer: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LeaveOrEndSessionDialog = (
  props: LeaveOrEndSessionDialogProps
) => {
    const {isOpen, isOrgnizer, onClose, onConfirm} = props
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="md"
    >
      <ModalOverlay />
      <ModalContent
        style={{
          position: "absolute",
          top: "30%",
        }}
        bg="gray.800"
        color={"white"}
      >
        <ModalHeader>
          {isOrgnizer ? "end the session?" : "leave the session?"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {isOrgnizer
              ? "You can just leave the call if you don't want to end it for everyone else."
              : "Are you sure want to leave the session?"}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant={"outline"}  bg="white"  mr={3} onClick={onConfirm}>
            {isOrgnizer ? "End Session" : "Leave Session"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
