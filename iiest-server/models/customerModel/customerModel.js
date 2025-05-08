const mongoose = require('mongoose');

const customerSchemaObject = new mongoose.Schema({
    iiest_member_id: {
        type: String,
        required: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    is_contact_verified: {
        type: Boolean,
        default: false
    },
    business_owner_ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boModel', // Reference to Business Owner Collection
        required: true
    },
    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Employee', // Reference to Employee Model
    //     required: true
    // },
    created_at: {
        type: Date,
        default: Date.now
    },
    business_category_ID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true
    },
    city_Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true
    },
    
});

const customerSchema = mongoose.model('customer', customerSchemaObject);
module.exports = customerSchema;
