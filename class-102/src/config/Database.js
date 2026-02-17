const mongoose = require("mongoose");

async function ConnectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("Database Connection Failed");
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = ConnectToDatabase;