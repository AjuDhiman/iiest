const nodemailer = require("nodemailer");

const mailData = JSON.parse(process.env.NODE_MAILER);
const FRONT_END = JSON.parse(process.env.FRONT_END);
const CONTACT_NUMBERS = JSON.parse(process.env.CONTACT_NUMBERS);
const LANDLINES = JSON.parse(process.env.LANDLINES);
const CB_ADDRESS = JSON.parse(process.env.CB_ADDRESS);
const CB_BRAND_NAME = JSON.parse(process.env.CB_BRAND_NAME);

// Create transporter once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailData.email,
    pass: mailData.pass,
  },
});


async function sendPasswordChangeMail(customer) {
  try {
    const { email, customer_name, username,password } = customer;

    const htmlContent = `
      <p>Dear ${customer_name},</p>
      <p>Your password has been successfully changed for your ${CB_BRAND_NAME.english} account.</p>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>New Password:</strong> ${password}</p>
      <p>You can login using the following link:</p>
      <a href="${FRONT_END.VIEW_URL}#/main"
         style="display: block;
                width: 100%;
                max-width: 300px;
                background: #20DA9C;
                border-radius: 8px;
                color: #fff;
                font-size: 18px;
                padding: 12px 0;
                margin: 20px auto;
                text-align: center;
                text-decoration: none;
                cursor: pointer;">
          Login Now
      </a>
      <br/>
      <p><b>Disclaimer:</b> This is a system-generated email, please do not reply.</p>
    `;

    let info = await transporter.sendMail({
      from: mailData.email,
      to: email,
      subject: `${CB_BRAND_NAME.english} -- Password Changed`,
      html: htmlContent,
    });

    console.log("Password change email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending password change email:", error);
    throw error;
  }
}


module.exports = {
  sendPasswordChangeMail,
 
};
