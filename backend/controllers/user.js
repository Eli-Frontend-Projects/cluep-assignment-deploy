import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export async function getUserFullNameById(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const username = `${user.firstName} ${user.lastName}`;

    return { username };
  } catch (err) {
    throw new Error(`Failed to retrieve user: ${err.message}`);
  }
}