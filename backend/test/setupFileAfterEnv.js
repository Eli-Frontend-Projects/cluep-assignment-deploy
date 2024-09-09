import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach } from '@jest/globals';
import { User } from '../db/models/user.js';
import { initDatabase } from '../db/init.js';


beforeAll(async () => {
  await initDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
})
