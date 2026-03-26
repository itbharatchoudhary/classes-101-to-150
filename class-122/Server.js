// Load environment variables early in application lifecycle
import "dotenv/config";

// Import application instance and database connector
import app from "./src/App.js";
import connectDB from "./src/Config/Database.js";
import { testAI } from "./src/Services/Ai.service.js";

// Define server port with fallback default
const PORT = process.env.PORT || 3000;

testAI();
/**
 * Initialize database connection before starting server
 * Ensures app runs only when DB is connected
 */
async function startServer() {
  try {
    // Establish MongoDB connection
    await connectDB();

    // Start Express server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // Log database connection failure securely
    console.error("MongoDB connection failed:", error.message);

    // Exit process to prevent running in unstable state
    process.exit(1);
  }
}

// Execute server startup function
startServer();
