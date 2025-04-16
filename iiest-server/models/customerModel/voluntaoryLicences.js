const mongoose = require('mongoose');

const voluntaryLicenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('voluntary_licenses', voluntaryLicenseSchema);
