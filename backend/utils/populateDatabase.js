import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { Message } from '../db/models/message.js';
import { initDatabase } from '../db/init.js';
import dotenv from 'dotenv';

dotenv.config();

const populateDatabase = async () => {
  try {
    // Initialize the database connection
    await initDatabase();

    // Clear existing collections
    await User.deleteMany({});
    console.log('User collection cleared');
    
    await Message.deleteMany({});
    console.log('Message collection cleared');

    // Drop erroneous index if exists
    const userIndexes = await User.collection.indexes();
    const userIDIndex = userIndexes.find(index => index.name === 'userID_1');
    if (userIDIndex) {
      await User.collection.dropIndex('userID_1');
      console.log('Dropped userID_1 index from User collection');
    }

    // Define the users to be added
    const usersData = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'securepassword123',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@example.com',
        password: 'anothersecurepassword456',
      },
    ];

    // Create and save the users
    for (const userData of usersData) {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Create a new user document
      const newUser = new User({ ...userData, password: hashedPassword });
      const savedUser = await newUser.save();
      console.log('User created successfully:', savedUser.toObject());

      // Create messages for each user
      const messages = [
        { userID: savedUser._id, message: `Hello, this is a message from ${savedUser.firstName}.` },
        { userID: savedUser._id, message: `Another message from ${savedUser.firstName}.` },
      ];

      // Save the messages
      for (const msg of messages) {
        const newMessage = new Message(msg);
        const savedMessage = await newMessage.save();
        console.log('Message created successfully:', savedMessage.toObject());
      }
    }
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the function to populate the database
populateDatabase();
