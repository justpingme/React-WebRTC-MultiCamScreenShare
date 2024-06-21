import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MediaServiceProvider from "./module/media/MediaServiceProvider";
import { MeetingServiceProvider } from "./module/meeting/MeetingProvider";
import { MemberServiceProvider } from "./module/members/MemberServiceProvider";
import RTCProvider from "./module/rtc/RtcProvider";
import AppRoutes from "./routes/app-routes";

function App() {
  return (
    <ChakraProvider>
      <MediaServiceProvider>
        <MemberServiceProvider>
          <MeetingServiceProvider>
            <RTCProvider>
              <AppRoutes />
            </RTCProvider>
          </MeetingServiceProvider>
        </MemberServiceProvider>
      </MediaServiceProvider>
    </ChakraProvider>
  );
}

export default App;
