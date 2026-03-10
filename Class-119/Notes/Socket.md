What does socket.io & And why we need socket.io ?
 
import App from "./src/App.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});

why we use this httpServer ? 
what is mean 
io : Server , 
on: event ko listen,
emit: event ko fire krna,
socket : single user

what is ->
socket.emit()
socket.broadcast().emit()
io.emit()

