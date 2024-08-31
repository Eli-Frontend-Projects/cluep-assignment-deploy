import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';

export async function createUser({ userID, firstName, lastName, email, password }) {
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