const axios = require('axios');
const crypto = require('crypto'); // Correctly using the built-in crypto module
const uniqid = require('uniqid');
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

const razorPayRequest = async (grandTotal, user, fboSessionId) => {
    try {
      const amountInPaise = Math.round(grandTotal * 100); 
  
      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${uniqid()}`,
        payment_capture: 1, // Auto capture
        notes: {
          employeeName: user.employee_name,
          employeeId: user.employee_id,
          sessionId: fboSessionId,

        }
      };
      const order = await razorpayInstance.orders.create(options);
  
      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: razorpayInstance.key_id,
        sessionId: fboSessionId
        };
  
    } catch (error) {
      console.error("Razorpay Error:", error);
      throw new Error("Failed to create Razorpay order.");
    }
  };
  

module.exports = razorPayRequest;
