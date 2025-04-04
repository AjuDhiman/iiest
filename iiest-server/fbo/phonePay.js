const axios = require('axios');
const crypto = require('crypto'); // Correctly using the built-in crypto module
const uniqid = require('uniqid');
const Razorpay = require('razorpay');

// Parse environment variables and ensure they are valid JSON
let PHONE_PE_CREDENTIALS;
let PHONE_PE_CREDENTIALS_TEST;

try {
    PHONE_PE_CREDENTIALS = JSON.parse(process.env.PHONE_PE_CREDENTIALS);
    PHONE_PE_CREDENTIALS_TEST = JSON.parse(process.env.PHONE_PE_CREDENTIALS_TEST);
} catch (error) {
    throw new Error("Failed to parse PHONE_PE_CREDENTIALS or PHONE_PE_CREDENTIALS_TEST. Ensure they are valid JSON.");
}

const productionBaseUrl = 'https://api.phonepe.com/apis/hermes/pg/v1/'
const sandboxBaseUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/';

// Determine whether you're in production or sandbox environment
const isProduction = true; 

// Define the endpoint
const endpoint = 'pay';


const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_nlDvHpgJl4lGja',
  key_secret: 'XVM7cJKNsmSqfHsEUDBbfTWx',
});

const payRequest = async (grandTotal, user, res, redirectUrl) => {
  try {
    // Convert amount to paise (if your grandTotal is in INR)
    const amountInPaise = grandTotal * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
      payment_capture: 1, // Auto capture after payment
      notes: {
        employeeName: user.employee_name,
        employeeId: user.employee_id,
      }
    };

    const order = await razorpayInstance.orders.create(options);

    console.log("Razorpay Order:", order);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: 'rzp_test_nlDvHpgJl4lGja', // Frontend needs this to open Razorpay Checkout
      redirectUrl, // If you want to redirect after success
    });

  } catch (error) {
    console.error("Razorpay Error:", error);
    return res.status(500).json({ error: "Failed to create Razorpay order." });
  }
};


module.exports = payRequest;
