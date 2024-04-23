import { createServer } from "http";
import { Server } from "socket.io";
import app from "../app.js";

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
