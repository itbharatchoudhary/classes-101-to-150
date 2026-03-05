require("dotenv").config();

const App = require("./src/App");
const ConnectToDB = require("./src/Config/Database");

const PORT = process.env.PORT || 3000;

/* =========================
   Start Server After DB Connects
========================= */
const startServer = async () => {
  try {
    await ConnectToDB();

    App.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Database connected successfully");
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();