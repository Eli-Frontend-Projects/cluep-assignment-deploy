import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser'

import { userRoutes } from './routes/user.js'

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

userRoutes(app);

// Test MongoDB connection
connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(5000, () => console.log("Server running on port 5000"));