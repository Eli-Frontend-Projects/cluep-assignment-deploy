import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../db/models/user.js';

export async function createUser({ firstName, lastName, email, password }) {
  const userID = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    userID,
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  return await user.save();
}