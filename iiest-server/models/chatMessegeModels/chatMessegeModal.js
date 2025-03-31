const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  boId: { type: String, ref: 'bo_registers', required: true },
  shopId: { type: String, ref: 'shopdetails', required: true },

  senderType: { type: String, enum: ['shop', 'agent'], required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  file: {
    fileName: String,
    fileUrl: String,
    mimeType: String
  },
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
