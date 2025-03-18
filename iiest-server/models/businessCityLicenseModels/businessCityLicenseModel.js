const mongoose = require("mongoose");
const businessCityLicenseSchema = new mongoose.Schema({
  business_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessType" }, 
  city_id: { type: mongoose.Schema.Types.ObjectId, ref: "City" }, 
  mandatory_licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "License" }], 
  voluntary_licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "License" }]  
});
const BusinessCityLicense = mongoose.model("BusinessCityLicense", businessCityLicenseSchema, "license_mappings");
module.exports = BusinessCityLicense;
