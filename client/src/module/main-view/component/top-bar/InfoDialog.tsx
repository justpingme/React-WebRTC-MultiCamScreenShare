import {
  Button,
  Flex,
  IconButton,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaInfo } from "react-icons/fa";
import { useMeetingService } from "../../../meeting/MeetingProvider";

export const InfoDialog = () => {
  const { meetingId } = useMeetingService();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { hasCopied, onCopy } = useClipboard(meetingId || "");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Tooltip label="Meeting Info" hasArrow bg="white" color="black">
        <span>
          <Popover isOpen={isOpen} onClose={handleToggle}>
            <PopoverTrigger>
              <IconButton
                isRound={true}
                variant={"outline"}
                icon={<FaInfo />}
                size="xs"
                _hover={{ background: "gray.700" }}
                color="white"
                onClick={handleToggle}
                aria-label={""}
              />
            </PopoverTrigger>
            <PopoverContent ml="15px">
              <PopoverHeader>Meeting Info</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverBody>
                <Flex direction="row" align="center" justify="space-between">
                  <Text fontSize="l" fontWeight={"bold"} mb={4}>
                    Meeting ID:{" "}
                    {meetingId.replace(/(\d{3})/g, "$1-").replace(/-$/, "")}
                  </Text>
                  <Flex direction="row">
                    <Button
                      size="sm"
                      onClick={onCopy}
                      variant="outline"
                      mb={3}
                      mr={2}
                    >
                      {hasCopied ? "Copied" : "Copy"}
                    </Button>
                  </Flex>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </span>
      </Tooltip>
    </>
  );
};
