const mongoose = require("mongoose");

const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB ERROR →", error.message);
    process.exit(1);
  }
};

module.exports = ConnectToDatabase;
