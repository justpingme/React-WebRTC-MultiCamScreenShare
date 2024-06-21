import { socketServer } from "../config/config";
import {
  SocketDisconnect,
  SocketListen,
  SocketRemoveListener,
  SocketSend,
} from "../types";

export const useSocket = () => {
  const send: SocketSend = (event: any, data: any) =>
    socketServer.emit(event, data);

  const listen: SocketListen = (event: any, callback: any) =>
    socketServer.on(event, callback);

  const removeListener: SocketRemoveListener = (event: any) =>
    socketServer.off(event);

  const disconnect: SocketDisconnect = () => socketServer.disconnect();

  return { send, listen, removeListener, disconnect };
};
