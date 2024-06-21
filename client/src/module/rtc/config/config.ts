import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const SOCKET_HOST = "http://localhost:3001";
const STUN_SERVER = "stun:stun.l.google.com:19302";

export const iceServers: RTCIceServer[] = [{ urls: STUN_SERVER }];

export const socketServer: Socket<DefaultEventsMap, DefaultEventsMap> =
  io(SOCKET_HOST);
