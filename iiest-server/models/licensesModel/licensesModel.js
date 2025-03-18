const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
  name: String,
  category: String,
  issuing_authority: String,
  validity_years: Number,
  description: String
});

const License = mongoose.model("License", licenseSchema, "licenses"); // Ensure correct collection name

module.exports = License;
