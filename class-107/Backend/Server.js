// ======================================================
// 1. Load Environment Variables
// ======================================================
require("dotenv").config(); 

/*
Loads sensitive configuration (like DB URIs, API keys, PORT) 
from a .env file into process.env
Ensures no sensitive info is hardcoded.
*/


// ======================================================
// 2. Import Application & Database
// ======================================================
const app = require("./src/App");                 
const connectToDatabase = require("./src/config/Database"); 

/*
- app: Express application with all middlewares and routes
- connectToDatabase: Function to establish MongoDB connection
*/


// ======================================================
// 3. Define Server Port
// ======================================================
const PORT = process.env.PORT || 3000;

/*
Server will listen on the port defined in environment variables
or default to 3000 if not set.
*/


// ======================================================
// 4. Connect to MongoDB and Start Server
// ======================================================
const startServer = async () => {
  try {
    await connectToDatabase(); // Connect to MongoDB

    // Start Express server only if DB connection succeeds
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("✗ Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();

/*
Professional Approach:
1. Async encapsulation separates startup logic.
2. Handles DB connection failures gracefully.
3. Ensures server only starts if MongoDB connection is successful.
*/