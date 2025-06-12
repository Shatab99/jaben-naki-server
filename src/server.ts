import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;
let io: SocketIOServer;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        server = app.listen(config.port, () => {
            console.log(`Jaben Naki Server listening at http://localhost:${config.port}`);
        });

        // Initialize Socket.IO
        io = new SocketIOServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE"],
            }
        });

        // Handle Socket.IO connections
        io.on("connection", (socket) => {
            console.log("A user connected:", socket.id);

            socket.on("join-room", (roomId) => {
                socket.join(roomId);
                console.log(`User ${socket.id} joined room: ${roomId}`);
            })

            socket.on("disconnect", () => {
                console.log("A user disconnected:", socket.id);
            });
        });

    } catch (err) {
        console.log(err);
    }
}

main();


export { io };
