import { Message } from '../db/models/message.js';

export async function createMessage(userId, { message }) {
  try {
    const newMessage = new Message({ userID: userId, message });
    return await newMessage.save();
  } catch (err) {
    throw new Error('Failed to create message');
  }
}

export async function getMessages(userId) {
  try {
    return await Message.find({ userID: userId }, 'message').sort({ createdAt: 'ascending' });
  } catch (err) {
    throw new Error('Failed to retrieve messages');
  }
}
