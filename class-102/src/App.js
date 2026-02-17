const express = require("express");
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./Routes/Auth.routes");

const App = express();

App.use(express.json());
App.use(cookieParser());

App.use('/api/Auth', AuthRoutes);

module.exports = App;