import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true, 
  }
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);