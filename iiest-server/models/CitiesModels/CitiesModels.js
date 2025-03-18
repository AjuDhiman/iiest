const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", CitySchema, "cities");
