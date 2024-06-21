import { Server, Socket } from "socket.io";
import {
  User,
  Meeting,
  CreateMeetingPayload,
  JoinMeetingPayload,
  OfferPayload,
  AnswerPayload,
  IceCandidatePayload,
} from "./types/types";

const users: { [key: string]: User } = {};
const meetings: { [key: string]: Meeting } = {};

export const setupSocketHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    io.to(socket.id).emit("connected-to-socket", { socketId: socket.id });

    socket.on("create-meeting", ({ meetingId, name }: CreateMeetingPayload) => {
      const user: User = { id: socket.id, name, meetingId };
      if (!meetings[meetingId]) {
        users[socket.id] = user;
        meetings[meetingId] = { status: "created", users: [user] };
      }
      io.to(socket.id).emit("meeting-created", {
        meetingId,
        status: "created",
      });
    });

    socket.on("start-meeting", ({ meetingId }: { meetingId: string }) => {
      if (meetings[meetingId]) {
        meetings[meetingId].status = "started";
        socket.join(meetingId);
        io.to(socket.id).emit("meeting-started", {
          meetingId,
          status: "started",
        });
      } else {
        io.to(socket.id).emit("meeting-started", {
          meetingId,
          status: "invalid",
        });
      }
    });

    socket.on("join-meeting", ({ meetingId, name }: JoinMeetingPayload) => {
      if (meetings[meetingId]) {
        const { status } = meetings[meetingId];
        const user: User = { id: socket.id, name, meetingId };

        if (status === "started") {
          users[socket.id] = user;
          socket.join(meetingId);
          io.to(socket.id).emit("join-meeting-response", { status, meetingId });
          socket
            .to(meetingId)
            .emit("new-user-joined", { socketId: socket.id, name });
        } else {
          io.to(socket.id).emit("join-meeting-response", { status, meetingId });
        }
      } else {
        io.to(socket.id).emit("join-meeting-response", {
          status: "invalid",
          meetingId,
        });
      }
    });

    socket.on("offer", (data: OfferPayload) => {
      io.to(data.to).emit("onOffer", { from: socket.id, ...data });
    });

    socket.on("answer", (data: AnswerPayload) => {
      io.to(data.to).emit("onAccepted", { from: socket.id, ...data });
    });

    socket.on("iceCandidate", (data: IceCandidatePayload) => {
      io.to(data.to).emit("onIceCandidate", { from: socket.id, ...data });
    });
  });
};
