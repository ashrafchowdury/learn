import dotenv from "dotenv";
dotenv.config();

import db from "./src/config/db.js";
import { io } from "./src/libs/socket.js";

io.on("connection", (socket) => {
  console.log("server id", socket.id);
  socket.emit('event', 'Any thing it cloud be')
});

db()
  .then(() => {
    io.listen(5000);
    console.log("socket is running...");
  })
  .catch((err) => console.log("Something wrong on database connection:", err));
