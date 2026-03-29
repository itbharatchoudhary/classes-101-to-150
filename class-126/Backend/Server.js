// Load environment variables early in application lifecycle
import "dotenv/config";

// Import application instance and database connector
import app from "./src/App.js";
import http from "http";
import connectDB from "./src/Config/Database.js";
import { initSocket } from "./src/Sockets/Server.Socket.js";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

initSocket(httpServer);

async function startServer() {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
}

startServer();
