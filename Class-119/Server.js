import App from "./src/App.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("new connection create")
    socket.on("message", (msg) => {
        console.log("user fired message");
        console.log(msg);
        io.emit("abc")
    })

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});


