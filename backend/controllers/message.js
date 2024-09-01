import { Message } from '../db/models/message.js';

export async function createMessage(userId, { message }) {
  const newMessage = new Message({ userID: userId, message });

  return await newMessage.save();
}

export async function getMessages(userId) {
  return await Message.find({ userID: userId }).sort({ createdAt: 'ascending' });
}