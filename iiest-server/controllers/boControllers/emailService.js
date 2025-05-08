const nodemailer = require("nodemailer");
const mailData = JSON.parse(process.env.NODE_MAILER);
const FRONT_END = JSON.parse(process.env.FRONT_END);
const CONTACT_NUMBERS = JSON.parse(process.env.CONTACT_NUMBERS);
const LANDLINES = JSON.parse(process.env.LANDLINES);
const CB_ADDRESS = JSON.parse(process.env.CB_ADDRESS);
const CB_BRAND_NAME = JSON.parse(process.env.CB_BRAND_NAME);

exports.sendMailToBo = async (boMail, mailInfo) => {
  console.log("mailInfo23==>", mailInfo);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailData.email,
        pass: mailData.pass,
      },
    });

    const { englishContent, hindiContent } = getMailContent(mailInfo);

    if (!englishContent || !hindiContent) {
      return;
    }

    let info = await transporter.sendMail({
      from: mailData.email,
      to: boMail,
      subject: `${CB_BRAND_NAME.english} -- Onboard`,
      html: `<p>Welcome to ${CB_BRAND_NAME.english},<br>
            ${CB_BRAND_NAME.english} Portal empowers businesses to meet compliance and legal requirements easily.</p>
            <p>Dear Valued Customer</p>
            ${englishContent}

            Brand Name - ${CB_BRAND_NAME.english},<br/>
            Address - ${CB_ADDRESS.english}<br/>
            Email - customerrelations@iiest.org<br>
            Contact no - ${CONTACT_NUMBERS.connect_bharat}<br>
            Landline - ${LANDLINES.landline1}, ${LANDLINES.landline2}<br>
            Website - <a href='https://connectonline.world'>connectonline.world</a><br>
            Contact time 10 :00 a.m to 7:00 p.m<br>'
            <br><br>
           
            <hr>
            <br>

            <p>${CB_BRAND_NAME.hindi} में आपका स्वागत है,<br>
        ${CB_BRAND_NAME.hindi} पोर्टल व्यवसायों को आसानी से अनुपालन और कानूनी आवश्यकताओं को पूरा करने में सक्षम बनाता है।</p>
            <p>प्रिय मूल्यवान ग्राहक</p>
            ${hindiContent}
            
            ब्रांड नाम = ${CB_BRAND_NAME.hindi}<br>
        पता - ${CB_ADDRESS.hindi}<br/>
        ईमेल - customerrelations@iiest.org<br>
        संपर्क नंबर- ${CONTACT_NUMBERS.connect_bharat}<br>
        लैंडलाइन - ${LANDLINES.landline1}, ${LANDLINES.landline2}<br>
वेबसाइट - <a href='https://connectonline.world'>connectonline.world</a>
        संपर्क समय प्रातः 10:00 बजे से सायं 7:00 बजे तक<br>
        <br>
        यह ईमेल प्रणाली द्वारा उत्पन्न किया गया है, कृपया इस ईमेल का उत्तर न दें।
        <hr> <br>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
//this function decides the content of a mail on the basis of pupose comming from mailInfo
function getMailContent(mailInfo) {
  let englishContent = "";
  let hindiContent = "";

  if (mailInfo.purpose == "verification") {
    englishContent = `<p>Thanks for registering in the Connect Bharat Project. To complete the registration process and activate your 
        account, we need to verify your email address.</p>
        <p>Your Email: ${mailInfo.email}</p>
        <p>Your Contact No.: ${mailInfo.contact_no}</p>
        <p>Please check email and contact number above and click button below for verifing your email.</p>
        <br/>
        <a style="text-decoration: none;" href='${FRONT_END.VIEW_URL}#/verifyonboard/bo/${mailInfo.id}'>
            <button style="display: block;
            width: 100%;
            max-width: 300px;
            background: #20DA9C;
            border-radius: 8px;
            color: #fff;
            font-size: 18px;
            padding: 12px 0;
            margin: 30px auto 0;
            text-decoration: none; cursor: pointer;">Verify</button>
        </a>
        </br>
        <p><b>Disclaimer:  This mail is system generated, please do not replay on this mail.</b></p>
        <p>Thank You</p>`;

    hindiContent = `<p>कनेक्ट भारत परियोजना में पंजीकरण के लिए धन्यवाद। पंजीकरण प्रक्रिया पूरी करने और अपने खाते को सक्रिय करने के लिए, 
        हमें आपके ईमेल पते को सत्यापित करना होगा।</p>
        <p>आपका ईमेल: ${mailInfo.email}</p>
        <p>आपका संपर्क नंबर: ${mailInfo.contact_no}</p>

        <p>कृपया ऊपर ईमेल और संपर्क नंबर की जाँच करें और अपने ईमेल को सत्यापित करने के लिए नीचे बटन पर क्लिक करें।</p>
        <br/>
        <br/>
        <a style="text-decoration: none;" href='${FRONT_END.VIEW_URL}#/verifyonboard/bo/${mailInfo.id}'>
            <button style="display: block;
            width: 100%;
            max-width: 300px;
            background: #20DA9C;
            border-radius: 8px;
            color: #fff;
            font-size: 18px;
            padding: 12px 0;
            margin: 30px auto 0;
            text-decoration: none; cursor: pointer;">Verify (वेरीफाई)</button>
        </a>
        <br/>
        <br/>
        <p><b>अस्वीकृति: यह मेल सिस्टम द्वारा उत्पन्न किया गया है, कृपया इस मेल का जवाब न दें</b></p>
        <p>धन्यवाद</p>`;
  } else if (mailInfo.purpose == "onboard") {
    englishContent = `<p>Thanks for registering in the Connect Bharat Project. Your Business Operation(BO) Number is generated and sent to you via this mail, Please use it for refernce whenever you contact us.<br>You have become eligible recipent of various government befits, as per your buiness norms, under the schemes issued for SMEs for business growth. <br>You will receive a call within 7 days to verify your details. Kindly do the needful.
        The company has zero tolerance towards any bribery, corruption & fraud in business activities.</p>
        <br/>
         <p><b>Disclaimer:  This mail is system generated, please do not replay on this mail.</b></p>
        <p>Thank You</p>
        <br>
        BO Name - ${mailInfo.boName}<br>
        Manager Name - ${mailInfo.managerName}<br>
        BO ID No - ${mailInfo.customerId}<br>
        Password - ${mailInfo.password}<br>`;

    hindiContent = `<p>कनेक्ट भारत परियोजना में पंजीकरण के लिए धन्यवाद। आपका व्यवसायिक संचालन (बीओ) नंबर उत्पन्न किया गया है और आपको इस मेल के माध्यम से भेजा गया है, कृपया जब भी हमसे संपर्क करें तो इसका उपयोग करें।<br>आप विभिन्न सरकारी लाभों के पात्र हो गए हैं, अपने व्यवसाय नियमों के अनुसार, व्यवसाय की वृद्धि के लिए एसएमई के लिए जारी योजनाओं के तहत।<br>आपको अपना विवरण सत्यापित करने के लिए 7 दिनों के भीतर एक कॉल प्राप्त होगा। कृपया आवश्यक कार्रवाई करें।
        कंपनी कारोबार गतिविधियों में किसी भी घूस, भ्रष्टाचार और धोखाधड़ी के प्रति शून्य सहनशीलता की नीति रखती है।</p>
        <p><b>अस्वीकृति: यह मेल सिस्टम द्वारा उत्पन्न किया गया है, कृपया इस मेल का जवाब न दें</b></p>
        <p>धन्यवाद</p>
        <br>
        बीओ नाम - ${mailInfo.boName}<br>
        मैनेजर नाम - ${mailInfo.managerName}<br>
        बीओ आईडी नंबर - ${mailInfo.customerId}<br>`;
  } else if (mailInfo.purpose === "update_account") {
    const encodedCustomerId = encodeURIComponent(mailInfo.customerId);

    englishContent = `
          <p>Dear ${mailInfo.boName},</p>
          <p>As part of the Connect Bharat initiative, we are launching new features and improvements to better serve our business community.</p>
          <p>We request you to update your account details to unlock access to new services, government scheme benefits, and compliance support.</p>
          <p>Please click the button below to update your business information:</p>
          <br/>
          <a href="${FRONT_END.VIEW_URL}#/update-bo-customer/${encodedCustomerId}"
          style="display: block;
          width: 100%;
          max-width: 300px;
          background: #007bff;
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          padding: 12px 0;
          margin: 20px auto;
          text-align: center;
          text-decoration: none;
          cursor: pointer;">
    Update My Account
</a>

          <p>If you have already updated your account, you can ignore this message.</p>
          <br>
          <p><b>Disclaimer: This is a system-generated email, please do not reply.</b></p>
          <p>Thank You</p>
        `;

    hindiContent = `
          <p>प्रिय ${mailInfo.boName},</p>
          <p>कनेक्ट भारत पहल के तहत, हम अपने व्यापारिक समुदाय के लिए नए फीचर्स और सेवाएं शुरू कर रहे हैं।</p>
          <p>कृपया अपने खाते को अपडेट करें ताकि आप नई सुविधाओं, सरकारी योजनाओं और अनुपालन सहायता का लाभ उठा सकें।</p>
          <p>नीचे दिए गए बटन पर क्लिक करके अपने व्यावसायिक विवरण को अपडेट करें:</p>
          <br/>
        
         <a href="${FRONT_END.VIEW_URL}#/update-bo-customer/${encodedCustomerId}"
          style="display: block;
          width: 100%;
          max-width: 300px;
          background: #007bff;
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          padding: 12px 0;
          margin: 20px auto;
          text-align: center;
          text-decoration: none;
          cursor: pointer;">
    मेरा खाता अपडेट करें
</a>
          <p>यदि आपने पहले ही अपडेट कर लिया है, तो कृपया इस संदेश को अनदेखा करें।</p>
          <br>
          <p><b>अस्वीकृति: यह मेल प्रणाली द्वारा उत्पन्न किया गया है, कृपया उत्तर न दें।</b></p>
          <p>धन्यवाद</p>
        `;
  }

  return { englishContent, hindiContent };
}

// exports.sendCredentialToBo = async (boMail, mailInfo) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: mailData.email,
//                 pass: mailData.pass
//             }
//         });

//         const { englishContent, hindiContent } = getCredentialMailContent(mailInfo);

//         if (!englishContent || !hindiContent) {
//             return;
//         }

//         let info = await transporter.sendMail({
//             from: mailData.email,
//             to: boMail,
//             subject: `${CB_BRAND_NAME.english} -- Login Credentials`,
//             html: `
//             <p>Welcome to ${CB_BRAND_NAME.english},</p>
//             <p>Your account has been successfully created. Below are your login credentials:</p>

//             ${englishContent}
//             <p>This email is system generated, please do not reply.</p>`
//         });

//         console.log('Credential Email sent: %s', info.messageId);
//     } catch (error) {
//         console.error('Error sending credential email:', error);
//         throw error;
//     }
// };
// function getCredentialMailContent(mailInfo) {
//     let englishContent = `
//     <p><strong>Username:</strong>abcd@gmail.com</p>
//     <p><strong>Password:</strong> ${mailInfo.password}</p>
//     <p>Please use the above credentials to log in to our portal.</p>
//     <a href='${FRONT_END.VIEW_URL}#/login'>
//         <button style="background: #20DA9C; color: #fff; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">
//             Login Now
//         </button>
//     </a>`;

//     return { englishContent };
// }
