const fboModel = require("../../models/fboModels/fboSchema");
const { recipientModel } = require("../../models/fboModels/recipientSchema");
const fostacVerifyModel = require("../../models/operationModels/basicFormSchema");
const fostacEnrollmentModel = require("../../models/operationModels/enrollmentSchema");
const generalSectionModel = require("../../models/operationModels/generalSectionSchema");
const { logAudit } = require("../generalControllers/auditLogsControllers");

exports.fostacVerification = async (req, res) => {
    try {

        let success = false;

        const recipientId = req.params.recipientid;

        const { recipient_name, fbo_name, owner_name, father_name, dob, address, recipient_contact_no, email, aadhar_no, pancard_no, sales_date, username, password } = req.body;

        const checkAddress = await fostacVerifyModel.findOne({ address });

        if (checkAddress) {
            success = false;
            return res.status(401).json({ success, addressErr: true });
        }

        const checkExistingMail = await fostacVerifyModel.findOne({ email });

        if (checkExistingMail) {
            success = false;
            return res.status(401).json({ success, emailErr: true })
        }

        const checkUsername = await fostacVerifyModel.findOne({ userName: username })

        if (checkUsername) {
            success = false;
            return res.status(401).json({ success, userNameErr: true })
        }

        const basicFormAdd = await fostacVerifyModel.create({ operatorInfo: req.user.id, recipientInfo: recipientId, email, address, pancardNo: pancard_no, fatherName: father_name, dob, userName: username, password, salesDate: sales_date });

        //this code is for tracking the flow of data regarding to a recipient

        const log = logAudit(req.user._id, recipientId, "Recipient verified" );

        // code for tracking ends

        if (basicFormAdd) {
            success = true
            return res.status(200).json({ success, verifiedId:basicFormAdd._id });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getFostacVerifiedData = async (req, res) => {
    try {
        let success = false;

        const recipientId = req.params.recipientid;

        const verifedData = await fostacVerifyModel.findOne({ recipientInfo: recipientId });

        if (verifedData) {
            success = true;
            return res.status(200).json({ success, message: 'verified recipient', verifedData });
        } else {
            return res.status(204).json({ success, message: 'Recipient is not verified' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//backend code for enrollment form
exports.fostacEnrollment = async (req, res) => {
    try {
        let success = false;

        const verifiedDataId = req.params.verifieddataid;

        const { tentative_training_date, fostac_training_date, roll_no } = req.body;

        const checkRollNo = await fostacEnrollmentModel.findOne({ roll_no });

        if (checkRollNo) {
            success = false;
            return res.status(401).json({ success, rollNoErr: true });
        }

        const enrollRecipient = await fostacEnrollmentModel.create({ operatorInfo: req.user.id, verificationInfo: verifiedDataId, tentative_training_date, fostac_training_date, roll_no });

        //this code is for tracking the flow of data regarding to a recipient

        const verifiedData = await fostacVerifyModel.findOne({_id:verifiedDataId});//only for getting recipient id

        const log = logAudit(req.user._id , verifiedData.recipientInfo, "Recipient Enrolled" );

        // code for tracking ends

        if (enrollRecipient) {
            success = true;
            return res.status(200).json({ success, message: 'Enrolled recipient' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getFostacEnrolledData = async (req, res) => {
    try {
        let success = false;

        const verifiedDataId = req.params.verifieddataid;

        const enrolledData = await fostacEnrollmentModel.findOne({ verificationInfo: verifiedDataId });

        if (enrolledData) {
            success = true;
            return res.status(200).json({ success, message: 'Enrolled recipient', enrolledData });
        } else {
            return res.status(204).json({ success, message: 'Recipient is not enrolled' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.postGenOperData = async (req, res) => {

    try {

        let success = false;

        const { recipient_status, officer_note } = req.body;

        const operGenSecAdd = await generalSectionModel.create({ operatorInfo: req.user.id, recipientInfo: recipientId, recipientStatus: recipient_status, officerNote: officer_note });

        if (operGenSecAdd) {
            success = true
            return res.status(200).json({ success })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getGenOperData = async(req,res) => {
    try {
        let success = false;

        const recipientId = req.params.recipientid;

        const genSecData = await generalSectionModel.findOne({ recipientInfo: recipientId });

        if (genSecData) {
            success = true;
            return res.status(200).json({ success, genSecData });
        } else {
            return res.status(204).json({ success });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateGenOperData = async (req, res) => {

    try {

        let success = false;

        const recipientId = req.params.recipientid;

        const { recipient_status, officer_note } = req.body;

        const operGenSecUpdate = await generalSectionModel.findOneAndUpdate({recipientInfo:recipientId},{ recipientStatus: recipient_status, officerNote: officer_note });

        if (operGenSecUpdate) {
            success = true
            return res.status(200).json({ success })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}