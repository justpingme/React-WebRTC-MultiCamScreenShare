import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
interface StreamPlayerProps {
  stream: MediaStream;
  name: string;
  isEnabled: boolean;
}
export const StreamPlayer = (props: StreamPlayerProps) => {
  const { stream, name, isEnabled } = props;

  return isEnabled ? (
    <Box
      position="relative"
      width="100%"
      style={{
        paddingTop: "75%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactPlayer
        url={stream!}
        playing={true}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </Box>
  ) : (
    <Avatar name={name} size="2xl" />
  );
};
