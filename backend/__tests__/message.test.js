import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { describe, expect, test, beforeAll, beforeEach, afterAll } from '@jest/globals';
import { Message } from '../db/models/message.js';
import { User } from '../db/models/user.js';
import { createUser } from '../controllers/user.js';
import { createMessage, getMessages } from '../controllers/message.js';
import { jest } from '@jest/globals';

let testUser = null;

beforeAll(async () => {
  const { token } = await createUser({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'securepassword123',
  });

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  console.log("finding testUser");
  testUser = await User.findById(userId);
  if (!testUser) {
    throw new Error('Test user not found');
  }

  await Message.deleteMany({ userID: testUser._id });
});

beforeEach(async () => {
  await Message.deleteMany({ userID: testUser._id });
});

describe('creating messages', () => {
  test('with all parameters should succeed', async () => {
    const msg = { message: `Hello, this is a test message.` };

    const createdMessage = await createMessage(testUser._id, msg);
    expect(createdMessage._id).toBeInstanceOf(mongoose.Types.ObjectId);

    const foundMessage = await Message.findById(createdMessage._id);

    expect(foundMessage).toBeDefined();
    expect(foundMessage).toEqual(expect.objectContaining(msg));
    expect(foundMessage.createdAt).toBeInstanceOf(Date);
    expect(foundMessage.updatedAt).toBeInstanceOf(Date);

    expect(String(foundMessage.userID)).toBe(String(testUser._id));
  });

  test('retrieves messages in ascending order', async () => {
    const testMessages = [
      { userID: testUser._id, message: `Hello, this is a message from ${testUser.firstName}.` },
      { userID: testUser._id, message: `Another message from ${testUser.firstName}.` },
    ];

    await Message.insertMany(testMessages);

    const messages = await getMessages(testUser._id);
    expect(messages).toHaveLength(testMessages.length);

    for (let i = 0; i < testMessages.length; i++) {
      expect(messages[i].message).toBe(testMessages[i].message);
    }
  });

  test('fails to create message with invalid user ID', async () => {
    await expect(createMessage('invalidUserId', { message: 'This should fail.' }))
      .rejects
      .toThrow('Failed to create message');
  });

  test('handles message creation errors', async () => {
    const originalSave = Message.prototype.save;
    Message.prototype.save = jest.fn(() => Promise.reject(new Error('Database error')));

    await expect(createMessage(testUser._id, { message: 'Error scenario.' }))
      .rejects
      .toThrow('Failed to create message');

    Message.prototype.save = originalSave;
  });
});
