import express from "express";


const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({ String: "ok" })
})

export default app