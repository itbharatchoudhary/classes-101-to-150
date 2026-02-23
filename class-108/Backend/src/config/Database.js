// ======================================================
// 1. Import Mongoose
// ======================================================
const mongoose = require("mongoose");

/*
Mongoose is an ODM for MongoDB:
- Schema validation
- Model-based queries
- Structured DB interactions
*/


// ======================================================
// 2. MongoDB Connection Function
// ======================================================
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✓ MongoDB Connected Successfully");
  } catch (error) {
    console.error("✗ Database Connection Error:", error.message);
    process.exit(1); // Prevent server from running with broken DB
  }
};

/*
Async function allows clean usage with await.
- Connects to MongoDB using URI from environment variables
- Exits process if connection fails
*/


// ======================================================
// 3. Export Database Connector
// ======================================================
module.exports = connectToDatabase;

/*
Encapsulates DB connection logic for modularity.
- server.js calls this function to ensure DB is ready before server starts.
*/