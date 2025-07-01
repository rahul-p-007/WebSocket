"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
// event handler
wss.on("connection", (socket) => {
    console.log("User connected to server");
    socket.send("HIi");
    //   setInterval(() => {
    //     socket.send("Hii1111");
    //   }, 5000);
    socket.on("message", (e) => {
        // console.log(e.toString);
        const message = e.toString();
        if (message === "ping") {
            socket.send("pong");
            return;
        }
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
