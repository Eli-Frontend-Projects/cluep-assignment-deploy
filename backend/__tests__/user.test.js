import { describe, expect, test, beforeEach } from '@jest/globals';
import { createUser, loginUser } from '../controllers/user.js';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

beforeEach(async () => {
    await User.deleteMany({});
});

describe('User Authentication Tests', () => {
  test('Creating a user with all parameters should succeed', async () => {
    const user = {
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: 'hunter2',
    };

    const { token } = await createUser(user); // Destructure token from the response
    console.log(process.env.MONGO_DB_URI);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    
    console.log(userId);

    const foundUser = await User.findById(userId);
    
    expect(typeof token).toBe('string');

    expect(foundUser).toEqual(expect.objectContaining({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
  });

  test('Logging in with correct email and password should return a token', async () => {
    const password = 'hunter2';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: 'Dan',
      lastName: 'Hunter',
      email: 'dan@example.com',
      password: hashedPassword,
    });

    const { token } = await loginUser({ email: user.email, password });

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
      .toThrow('Invalid credentials');
  });

  test('Logging in with a non-existent email should throw an error', async () => {
    await expect(loginUser({ email: 'nonexistent@example.com', password: 'hunter2' }))
      .rejects
      .toThrow('Invalid credentials');
  });
});
