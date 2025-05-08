const mongoose = require('mongoose');

const expertConsultationSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true,
        trim: true
      },
  consultationDetails: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('expert-consultation', expertConsultationSchema);
