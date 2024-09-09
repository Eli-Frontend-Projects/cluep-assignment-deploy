import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser'

import { userRoutes } from './routes/user.js'
import { messageRoutes } from './routes/message.js'
import { initDatabase } from './db/init.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

userRoutes(app);
messageRoutes(app);

await initDatabase();

app.listen(5000, () => console.log("Server running on port 5000"));