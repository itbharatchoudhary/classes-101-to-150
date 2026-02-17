require("dotenv").config();
const App = require("./src/App");
const ConnectToDatabase = require("./src/config/Database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await ConnectToDatabase();
        console.log("Database Connected Successfully !");

        App.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Startup Failed");
        console.error(error.message);
        process.exit(1);

    }
}

startServer();