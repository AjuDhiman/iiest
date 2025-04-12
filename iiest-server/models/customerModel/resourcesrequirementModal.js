const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true,
        trim: true
      },
      jobDescription: {
        type: String,
        required: true,
        trim: true
      },
      
  designation: {
    type: String,
    required: true,
    trim: true
  },
  count: {
    type: Number,
    required: true,
    min: 1
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('resource-reuirement', resourceSchema);
