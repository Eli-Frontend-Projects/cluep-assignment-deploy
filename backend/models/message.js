const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  messageID: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    trim: true, 
  }
}, { timestamps: true }); 

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;