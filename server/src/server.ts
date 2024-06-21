import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupSocketHandlers } from "./socketHandlers";

const httpServer: HttpServer = createServer();
const io: SocketIOServer = new SocketIOServer(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

setupSocketHandlers(io);

const port: string | number = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`Socket.IO server is running on http://localhost:${port}`);
});
