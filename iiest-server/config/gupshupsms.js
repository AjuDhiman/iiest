//-------This  File contains the all the gupshup SMS related vars and methords --------

const GUPSHUP_CONFIG = JSON.parse(process.env.GUPSHUP_CONFIG);
const DLT_CONFIG = JSON.parse(process.env.DLT_CONFIG);
var request = require("request");
const axios = require('axios');
const https = require('https');
const qs = require('qs')


// methord for sending bo verification sms
exports.sendBOVerificationSMS = async (manager_contact, email, verification_link, phoneNo) => {
    const dltTempletID = '1007928778645796672';
    const message = `Thanks for registering in the Connect Bharat. To complete the registration process and activate your account, Please verify your email address ${email} and your phone number ${manager_contact}.by clicking the link below. ${verification_link}For any query call us on 9289310979 - Connect Bharat (IIEST)`;
    await sendSMS(message, phoneNo, dltTempletID);
};





// methord for sending bo Onboard sms
exports.sendBOOnBoardSMS = async (owner_name, manager_name, bo_id, phoneNo) => {

    console.log(owner_name, manager_name, bo_id, phoneNo);
    console.log("owner_name==============>",owner_name, manager_name, bo_id, phoneNo);
    const dltTempletID = '1007928778645796672';
    // const message = `Thanks for registering in the Connect Bharat.Your Business Operation(BO) Number is
    //                  generated and sent to you via message and email. You will receive a call within 3 
    //                  days to verify your details. Please use it for reference whenever you contact us . 
    //                  BO Name - ${owner_name}, Manager Name - ${manager_name}, BO ID No - ${bo_id}. For any query call us
    //                  on 9289310979 - Connect Bharat (IIESTF)`;


    const message = `Thanks for registering in the Connect Bharat.Your Business Operation(BO) Number is generated and sent to you via message and email. You will receive a call within 3 days to verify your details. Please use it for reference whenever you contact us . BO Name - ${owner_name}, Manager Name - ${manager_name}, BO ID No - ${bo_id}. For any query call us on 9289310979 -Connect Bharat (IIESTF)`;


    //sending sms
    const messageSent =  await sendSMS(message, phoneNo,dltTempletID);

    return messageSent

}





// methord for sending vrification sms for fostac
exports.sendFostacVerificationSMS = async (owner_name, manager_name, manager_contact, email, phoneNo) => {

    const dltTempletID = '';

    const message = ``;

    //sending sms
    await sendSMS(message, phoneNo);

}

// methord for sending verification sms for foscos
exports.SendFoscosVerificationSMS = async (owner_name, manager_name, manager_contact, email, phoneNo) => {

    const dltTempletID = '';

    const message = ``;

    //sending sms
    await sendSMS(dltTempletID, message, phoneNo);

}

// methord for sending verification sms for hra
exports.SendHraVerificationSMS = async (owner_name, manager_name, manager_contact, email, phoneNo) => {

    const dltTempletID = '';

    const message = ``;

    //sending sms
    await sendSMS(dltTempletID, message, phoneNo);

}

// methord for sending document reminder sms
exports.sendDocumentReminder = async (owner_name, manager_name, manager_contact, email, phoneNo) => {

    const dltTempletID = '';

    const message = ``;

    //sending sms
    await sendSMS(dltTempletID, message, phoneNo);

}

// methord for sending verification sms for foscos
exports.foscosVerificationSMS = async (owner_name, manager_name, manager_contact, email, phnoneNo) => {

    const dltTempletID = '';
    const message = ``;
    //sending sms
    await sendSMS(dltTempletID, message, phoneNo);
}

//async function sendSMS(dltTempletID, message, phoneNo)======
// async function sendSMS(message, phoneNo,dltTempletID) 
// {
//     console.log("message====>",message);
//     console.log("phoneNo====>",phoneNo);

//     const params = new URLSearchParams()
//     params.append('destination', phoneNo);
//     params.append('message', message);

//     var options = {
//         method: 'POST',
//         url: 'https://enterprise.smsgupshup.com/GatewayAPI/rest',
//         form:
//         {
//             method: 'sendMessage',
//             send_to: phoneNo,
//             msg: message,
//             msg_type: 'text',
//             userid: GUPSHUP_CONFIG.userid, auth_scheme: 'plain',
//             password: GUPSHUP_CONFIG.password,
//             v:1.1,
//             format: 'text',
//            principalEntityId: DLT_CONFIG.principalEntityId,
//             dltTempletID: dltTempletID
//         }
//     };
 
    
//     return new Promise((resolve, reject) => {
//         request(options, function (error, response, body) {
//             if (error){
//                 // throw new Error(error);
//                 reject(error);
//             };
//             console.log("body=====>",body);
//             resolve(body)
//         });
//     })

// }




    async function sendSMS(message, phoneNo,dltTempletID,) {
            console.log("message====>", message);
            console.log("phoneNo====>", phoneNo);
            console.log("userid==>",GUPSHUP_CONFIG.userid);
            console.log("password==>",GUPSHUP_CONFIG.password);
            console.log("dlt_template_id==>",dltTempletID);
            console.log("pe_id==>",DLT_CONFIG.principalEntityId)
  const payload = {
                method: 'sendMessage',
                send_to: phoneNo,
                msg: message,
                msg_type: 'text',
                userid: GUPSHUP_CONFIG.userid,
                auth_scheme: 'plain',
                password: GUPSHUP_CONFIG.password,
                v: '1.1',
                format: 'text',
                dlt_template_id:dltTempletID, 
                pe_id: DLT_CONFIG.principalEntityId 
            }            
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
                secureOptions: require('constants').SSL_OP_LEGACY_SERVER_CONNECT || 0x00000004
            });
        
            try {
                const response = await axios({
                    method: 'post',
                    url: 'https://enterprise.smsgupshup.com/GatewayAPI/rest',
                    data: qs.stringify(payload),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    httpsAgent
                });
                console.log("body=====>", response.data);
                return response.data;
            } catch (error) {
                console.error("SMS sending error:", error.response?.data || error.message || error);
                throw error;
            }
    }







//this is second methord we will use it if first one not works
// const { default: axios } = require('axios');
// /*
// Variables to replace
// YOUR_API_KEY => The unique identifier for a Gupshup account.
// YOUR_APP_ID=> The unique identifier for an app. An app's appid can be found in the cURL request generated on the dashboard.
// */
// const sendMessage = (msg, phone, callbackFunc) => {
//     const params = new URLSearchParams()
//     params.append('destination', phone);
//     params.append('message', msg);
//     params.append('source', 'GSDSMS'); //Required only for india

//     const config = {
//         headers: {
//             'apikey': YOUR_API_KEY,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     }

//     axios.post('http://api.gupshup.io/sms/v1/message/:YOUR_APP_ID', params, config)
//         .then((result) => {
//             console.log('Message sent');
//             callbackFunc(result.data);
//         })
//         .catch((err) => {
//             console.log(err);
//             callbackFunc(err);
//         })
// }