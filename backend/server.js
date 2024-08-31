import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Test MongoDB connection
connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(5000, () => console.log("Server running on port 5000"));
