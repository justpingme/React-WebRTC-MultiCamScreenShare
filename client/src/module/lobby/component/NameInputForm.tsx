import {
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Center,
} from "@chakra-ui/react"
import React from "react"

interface NameInputFormProps {
  name: string
  handleNameChange: (event: any) => void
  nameValidationError: string
}
export const NameInputForm: React.FC<NameInputFormProps> = ({
  name,
  handleNameChange,
  nameValidationError,
}) => {
  return (
    <Center>
      <Box mb="10" width={"60%"}>
        <FormControl isInvalid={!!nameValidationError}>
          <Input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <FormErrorMessage>{nameValidationError}</FormErrorMessage>
        </FormControl>
      </Box>
    </Center>
  )
}
