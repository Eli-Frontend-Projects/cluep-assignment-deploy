import axios from 'axios';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user.js'; 

import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

import { userRoutes } from '../routes/user.js';
import { messageRoutes } from '../routes/message.js';
import mongoose from 'mongoose';

dotenv.config();

let server;
const BASE_URL = process.env.API_BASE_URL; 

axios.defaults.baseURL = BASE_URL;

describe('User Routes', () => {
  let testToken = '';
  let testUserId = '';

  beforeAll(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    userRoutes(app);
    messageRoutes(app);

    server = app.listen(5000, () => console.log("Server running on port 5000"));

  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test('POST /user/signup should create a new user and return a token', async () => {
    const response = await axios.post('/user/signup', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoekk@example.com',
      password: 'securepassword123',
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('token');
    expect(response.data.message).toBe('User created successfully');

    testToken = response.data.token;
    const decodedToken = jwt.verify(testToken, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const foundUser = await User.findById(userId);

    expect(foundUser).toEqual(expect.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoekk@example.com',
    }));

    expect(foundUser._id.toString()).toBe(userId);

    testUserId = userId;
  });

  test('POST /user/login should return a token for valid credentials', async () => {
    const response = await axios.post('/user/login', {
      email: 'johndoekk@example.com',
      password: 'securepassword123',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    
    testToken = response.data.token;
  });

  test('GET /user/:id should return the full name of the user', async () => {
    const response = await axios.get(`/user/${testUserId}`, {
      headers: {
        Authorization: `Bearer ${testToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('username', 'John Doe');
  });

  test('GET /user/:id with invalid MongoDB ID should return 500', async () => {
    try {
      await axios.get('/user/invalidUserId', {
        headers: {
          Authorization: `Bearer ${testToken}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });

  test('GET /user/:id with non-existent ID should return 404', async () => {
    try {
      await axios.get(`/user/60d21b4667d0d8992e610c85`, { // Replace with a non-existent ID
        headers: {
          Authorization: `Bearer ${testToken}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error', 'User not found');
    }
  });

});
