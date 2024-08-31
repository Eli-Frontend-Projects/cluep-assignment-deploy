// backend/createUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js'; 
import { initDatabase } from '../db/init.js';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const createUser = async () => {
  try {
    // Initialize the database connection
    await initDatabase();

    // Define user details
    const userData = {
      userID: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'securepassword123',
    };

    // Hash the password
    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    // Create a new user instance
    const newUser = new User(userData);

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log('User created successfully:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
};

// Call the function to create the user
createUser();