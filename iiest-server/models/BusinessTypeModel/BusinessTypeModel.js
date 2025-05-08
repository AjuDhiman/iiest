const mongoose = require("mongoose");

const BusinessTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Explicitly set collection name to match the database
module.exports = mongoose.model("business_types", BusinessTypeSchema, "business_types");
