const express = require("express");
const cookieParser = require("cookie-parser");

const PostRouter = require("./Routes/Post.routes");
const AuthRoutes = require("./Routes/Auth.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/posts", PostRouter);
app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
