import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import { CreateMeeting } from "./component/CreateMeeting"
import { StartMeeting } from "./component/StartMeeting"
import { LocalWebCamStreamContainer } from "./component/LocalWebCamStreamContainer"
import { JoinMeeting } from "./component/join-meeting/JoinMeeting"
import { NameInputForm } from "./component/NameInputForm"
import { useLobbyHooks } from "./hooks/useLobbyHooks"
import { useMeetingService } from "../meeting/MeetingProvider"
export const Lobby = () => {
  const { meetingStatus } = useMeetingService()

  const {
    handleCreateMeeting,
    name,
    handleNameChange,
    nameValidationError,
    validateName,
  } = useLobbyHooks()
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bg="white"
    >
      <Box
        p={6}
        borderRadius="md"
        bg="white"
        shadow="md"
        textAlign="center"
        width="28%"
        mx="auto"
      >
        <LocalWebCamStreamContainer />

        {meetingStatus === "created" ? (
          <StartMeeting />
        ) : (
          <>
            <NameInputForm
              name={name}
              handleNameChange={handleNameChange}
              nameValidationError={nameValidationError}
            />
            <CreateMeeting onClick={handleCreateMeeting} />
            <JoinMeeting validateName={validateName} />
          </>
        )}
        <Box mb={"30%"}></Box>
      </Box>
    </Flex>
  )
}
