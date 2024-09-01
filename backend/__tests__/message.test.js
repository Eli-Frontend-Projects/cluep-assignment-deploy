import mongoose from 'mongoose';
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals';
import { Message } from '../db/models/message.js';
import { createUser } from '../controllers/user.js';

import {
  createMessage,
  getMessages,
} from '../controllers/message.js';

let testUser = null;
let testMessages = [];

beforeAll(async () => {
  testUser = await createUser({ 
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'securepassword123',
  });

  testMessages = [
    { userID: testUser._id, message: `Hello, this is a message from ${testUser.firstName}.` },
    { userID: testUser._id, message: `Another message from ${testUser.firstName}.` },
  ];
});

describe('creating messages', () => {
  test('with all parameters should succeed', async () => {
    
    const msg = {message: `Hello, this is a test message.` };

    const createdMessage = await createMessage(testUser._id, msg);
    expect(createdMessage._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundMessage =  await Message.findById(createdMessage._id);

    expect(foundMessage).toBeDefined();
    expect(foundMessage).toEqual(expect.objectContaining(msg));
    expect(foundMessage.createdAt).toBeInstanceOf(Date);
    expect(foundMessage.updatedAt).toBeInstanceOf(Date);

    expect(String(foundMessage.userID)).toMatch(String(testUser._id));
  });


});