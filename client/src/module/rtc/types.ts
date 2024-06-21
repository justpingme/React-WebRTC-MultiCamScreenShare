import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { ChannelType, ConnectionType, Member } from "../members/types"
export interface StartConnetionProps {
  localMember: Member
  remoteMember: Member
  streams: MediaStream[] | undefined
  connectionPurpose: ConnectionType
  data: any | null
  dataChannelName: ChannelType
}

export type SocketSend = (
  event: any,
  data: any
) => Socket<DefaultEventsMap, DefaultEventsMap>

export type SocketListen = (
  event: any,
  callback: any
) => Socket<DefaultEventsMap, DefaultEventsMap>

export type SocketRemoveListener = (
  event: any
) => Socket<DefaultEventsMap, DefaultEventsMap>

export type SocketDisconnect = () => void

export interface RtcType {
  startConnection: (props: StartConnetionProps) => Promise<RTCPeerConnection>
  testConsole: () => void
}

export interface RTCClientType {
  socket: SocketReturnType
  rtcClient: RtcType
}

export type SocketReturnType = {
  send: (event: any, data: any) => void
  listen: (event: any, data: any) => void
}

export type RTCClientHooksType = {
  makePeerConnection: (props: StartConnetionProps) => Promise<{
    peerConnection: RTCPeerConnection
    datachannel: RTCDataChannel
  }>
  makeOffer: (
    peerConnection: RTCPeerConnection,
    localMember: Member,
    remoteMember: Member,
    connectionPurpose: string
  ) => Promise<void>
  handleOffer: (
    peerConnection: RTCPeerConnection,
    data: {
      offer: RTCSessionDescriptionInit
      from: any
      name: string
      connectionPurpose: string
    },
    connectionPurpose: string
  ) => Promise<void>
}

export type SocketHooksType = {
  send: (event: any, data: any) => Socket<DefaultEventsMap, DefaultEventsMap>
  listen: (
    event: any,
    callback: any
  ) => Socket<DefaultEventsMap, DefaultEventsMap>
  removeListener: (event: any) => Socket<DefaultEventsMap, DefaultEventsMap>
  disconnect: () => void
}

export type SocketHandlerType = {
  handleMeetingCreated: (data: any) => void
  handleConnectedToSocket: (data: any) => void
  handleOnNewUserJoined: (data: any) => Promise<void>
  handleIncomingOffer: (data: any) => Promise<void>
}

export type RtcPropsType = RTCClientHooksType &
  SocketHooksType &
  SocketHandlerType
 
