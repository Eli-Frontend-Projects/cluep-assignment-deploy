import mongoose from 'mongoose';
import { describe, expect, test } from '@jest/globals';
import { createUser, loginUser } from '../controllers/user.js';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';

describe('User Authentication Tests', () => {
  beforeEach(async () => {
    // Clear the user collection before each test to avoid data conflicts
    await User.deleteMany({});
  });

  test('Creating a user with all parameters should succeed', async () => {
    const user = {
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: 'hunter2',
    };

    const createdUser = await createUser(user);
    
    // Expect a token to be returned
    expect(createdUser).toHaveProperty('token');
    
    // Find user in database to verify
    const foundUser = await User.findOne({ email: user.email });

    // Check if the user's data matches
    expect(foundUser).toEqual(expect.objectContaining({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
  });

  test('Logging in with correct email and password should return a token', async () => {
    const password = 'hunter2';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user directly in the database
    const user = await User.create({
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: hashedPassword,
    });

    // Attempt to log in
    const loginResponse = await loginUser({ email: user.email, password });

    // Expect a token to be returned
    expect(loginResponse).toHaveProperty('token');
    expect(typeof loginResponse.token).toBe('string');
  });

  test('Logging in with incorrect password should throw an error', async () => {
    const password = 'hunter2';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user
    await User.create({
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: hashedPassword,
    });

    // Test invalid login
    await expect(loginUser({ email: 'dan@example.com', password: 'wrongpassword' }))
      .rejects
      .toThrow('Invalid credentials');
  });

  test('Logging in with a non-existent email should throw an error', async () => {
    // Test invalid login
    await expect(loginUser({ email: 'nonexistent@example.com', password: 'hunter2' }))
      .rejects
      .toThrow('Invalid credentials');
  });
});
