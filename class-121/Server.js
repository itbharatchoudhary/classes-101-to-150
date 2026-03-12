import app from "./src/App.js";
import connectDB from "./src/Config/Database.js";
import dotenv from "dotenv";


dotenv.config();



const PORT = process.env.PORT || 5000;

// Connect to database first
connectDB()
  .catch((err) => {
    console.error("mongoDb connection failed:", err)
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});