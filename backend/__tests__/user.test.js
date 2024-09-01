import mongoose from 'mongoose';
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals'
import { createUser, loginUser } from '../controllers/user.js';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';

describe('test creating users', () => {
  test('with all parameters should succeed', async () => {
    const user = {
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: 'hunter2',
    };

    const createdUser = await createUser(user);
    
    expect(createdUser._id).toBeInstanceOf(mongoose.Types.ObjectId);

    const foundUser = await User.findById(createdUser._id);

    expect(foundUser).toEqual(expect.objectContaining({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));

  });

  test('Logging in with correct email and password should return a token', async () => {
    const password = 'hunter2';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Sign up the user (create the user in the database)
    const user = await User.create({
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: hashedPassword,
    });

    // Attempt to log in
    const token = await loginUser({ email: user.email, password });

    // Expect a token to be returned
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('Logging in with incorrect password should throw an error', async () => {
    const password = 'hunter2';
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: hashedPassword,
    });

    await expect(loginUser({ email: 'dan@example.com', password: 'wrongpassword' }))
      .rejects
      .toThrow('Invalid email or password!');
  });

  test('Logging in with a non-existent email should throw an error', async () => {
    await expect(loginUser({ email: 'nonexistent@example.com', password: 'hunter2' }))
      .rejects
      .toThrow('Invalid email or password!');
  });

});