import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import jwt from 'jsonwebtoken';

function generateToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}

export async function getUserFullNameById(userId) {
  try {
    const user = await User.findById(userId);
    
    if (!user) return { username: userId };

    const username = `${user.firstName} ${user.lastName}`;

    return { username };
  } catch (err) {
    return { username: userId };
  }
}

export async function createUser({ firstName, lastName, email, password }) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: 'Email is already in use' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = generateToken(user._id);

    return { token };
  } catch (error) {
    return { error: 'Unable to create user, please try again' };
  }
}

export async function loginUser({ email, password }) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken(user._id);

    return { token };
  } catch (error) {
    return { error: 'Invalid credentials' };
  }
}