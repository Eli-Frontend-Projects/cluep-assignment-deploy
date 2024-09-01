import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach } from '@jest/globals';
import { User } from '../db/models/user.js';
import { initDatabase } from '../db/init.js';

beforeEach(async () => {
  await User.deleteMany({});
})

beforeAll(async () => {
  await initDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
})
