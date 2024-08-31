import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../db/models/user.js';
import jwt from 'jsonwebtoken';

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

export async function loginUser({ email, password }) {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email!');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid password!');
  }

  // Generate a JWT token
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return token;
}