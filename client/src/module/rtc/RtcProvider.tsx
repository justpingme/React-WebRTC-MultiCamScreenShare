import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { useSocketHandler } from "./hooks/useSocketHandler";
import { useSocket } from "./hooks/useSocket";
import {
  RtcPropsType,
  SocketHooksType,
  RTCClientHooksType,
  SocketHandlerType,
} from "./types";
import { useRtcClient } from "./hooks/useRtcClient";

export const RTCContext = createContext<any | undefined>(undefined);

export const useRTC = (): RtcPropsType => {
  const context = useContext(RTCContext);
  if (!context) {
    throw new Error("useRTC must be used within an RTCProvider");
  }
  return context;
};

const RTCProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { ...socket }: SocketHooksType = useSocket();
  const { ...rtcClient }: RTCClientHooksType = useRtcClient(socket.send);
  const { ...socketHandler }: SocketHandlerType = useSocketHandler(
    rtcClient,
    socket
  );

  const rtcContextValue = useMemo(
    () => ({ ...rtcClient, ...socketHandler, ...socket }),
    []
  );

  return (
    <RTCContext.Provider value={rtcContextValue}>
      {children}
    </RTCContext.Provider>
  );
};

export default RTCProvider;
