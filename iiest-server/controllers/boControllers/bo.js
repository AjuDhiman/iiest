const boModel = require('../../models/BoModels/boSchema');
const customerModel = require('../../models/customerModel/customerModel');

const employeeSchema = require('../../models/employeeModels/employeeSchema')
const { sendMailToBo, sendCredentialToBo } = require('./emailService');
const { generateUniqueId, generateRandomPassword } = require('../../fbo/generateCredentials');
const { default: mongoose } = require('mongoose');
const fboModel = require('../../models/fboModels/fboSchema');
const { sendBOVerificationSMS, sendBOOnBoardSMS } = require('../../config/gupshupsms');

//methord for creating business owners
exports.createBusinessOwner = async (req, res) => {
    try {
        console.log("STEP 1: Data Received", req.body);

        const { owner_name, business_entity, business_category_Id, business_ownership_type, manager_name, contact_no, email, onboard_by,cityID } = req.body;

        if (!owner_name || !contact_no || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check Existing Email (Case Insensitive)
        const existingMail = await boModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        console.log("existingMail==>",existingMail)
        if (existingMail) {
            console.log("Email Already Exists");
            return res.status(401).json({ success: false, message: 'Email already exists' });
        }

        // Check Existing Contact Number
        const existingContact = await boModel.findOne({ contact_no: contact_no });
        if (existingContact) {
            console.log("Contact Number Already Exists");
            return res.status(401).json({ success: false, message: 'Contact number already exists' });
        }

        // Check Employee
        const employeeInfo = await employeeSchema.findOne({ employee_id: onboard_by });
        if (!employeeInfo) {
            console.log("Employee Not Found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log("STEP 2: Employee Found", employeeInfo);

        // Generate Unique ID
        const { idNumber, generatedUniqueCustomerId } = await generateUniqueId();
        console.log("STEP 3: Unique ID Generated:", idNumber, generatedUniqueCustomerId);

        // Create Business Owner
        const newBo = await boModel.create({
            id_num: idNumber,
            customer_id: generatedUniqueCustomerId,
            iiest_member_id: generatedUniqueCustomerId,
            owner_name,
            business_entity,
            business_category_ID:business_category_Id,
            business_ownership_type,
            contact_no,
            email: email.toLowerCase(),
            manager_name,
            onboard_by: employeeInfo._id,   
            is_contact_verified: false,
            is_email_verified: false,
            city_Id:cityID
        });
        console.log("STEP 4: Business Owner Created", newBo);
        const mailInfo = {
            purpose: 'verification',
            id: newBo._id,
            email: newBo.email,
            contact_no: newBo.contact_no
        };
        try {
            await sendMailToBo(email, mailInfo);

            console.log("STEP 7: Verification Mail Sent");
        } catch (mailError) {
            console.error("Mail Error:", mailError);
        }

        return res.status(200).json({ message: 'Business Owner Registered Successfully', data: newBo });

    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation Error:", error);
            return res.status(400).json({ message: error.message });
        }
        console.error("Internal Server Error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




//get list of all business owner from bo registers whose both contact and email are verified
exports.getAllBusinessOwners = async (_req, res) => {
    try {
        const businessOwners = await boModel.find({ is_contact_verified: true, is_email_verified: true });
        console.log(businessOwners);
        res.status(200).json({ data: businessOwners });
    } catch (error) {
        console.error('Error fetching business owners:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//getting all employee name and employeeid for showing list of sale employee in onboard form onboard officer field
exports.getEmployeeNameAndId = async (req, res) => {
    try {

        const nameNIdList = await employeeSchema.find({ status: true, department: 'Sales Department' }).select('employee_name employee_id');

        res.status(200).json(nameNIdList);

    } catch (error) {

        console.log('ID and Name List Error:', error);

        res.status(500).json({ success: false, message: 'Internal Server Error' });

    }
}

//methord for verifing email and contact of an bo by clicking verify mail button send in mail or sms
exports.verifyEmail = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { //sending error message in case of wrong format of objet id send in parameter
            return res.status(404).json({ success: false, message: "Not A Valid Request" }); //this message will be shown in verifing mail frontend
        }

        const idExsists = await boModel.findOne({ _id: req.params.id });
        console.log("idExsists=======>",idExsists)

        if (idExsists) {//sending already verified mail case of mailor contact already verified 
            if (idExsists.is_email_verified) {
                return res.status(200).json({ success: true, message: 'Already Verified' })
            }

            const verifiedMail = await boModel.findByIdAndUpdate(//updates the bo obj by assigning is_verified mail and is_contact _verified true
                { _id: req.params.id },
                {
                    $set: {
                        is_email_verified: true,
                        is_contact_verified: true
                    }
                },
                { new: true }
            );

            console.log("verifiedMail=======>",verifiedMail);
            if (!verifiedMail) {
                return res.status(404).json({ success: false, message: "Verification Failed", emailSendingErr: true });
            }
            const employee = await employeeSchema.findOne({ _id: idExsists.onboard_by });
            const newPassword = await generateRandomPassword();

            const newCustomer = await customerModel.create({
                business_owner_ref_id: idExsists._id,
                customer_name: idExsists.manager_name,
                iiest_member_id: idExsists.customer_id,
                username: idExsists.customer_id,
                password: newPassword,
                email: idExsists.email,
                contact_no: idExsists.contact_no,
                created_by: employee._id,
                business_category_ID:idExsists.business_category_ID,
                city_Id:idExsists.city_Id
            });
            console.log("newCustomer---->",newCustomer)
          
          
            //checking for is admin or not
            const isAdmin = employee.employee_name.toLowerCase().includes('admin');
            const mailInfo = {
                boName: idExsists.owner_name,
                purpose: 'onboard',
                customerId: verifiedMail.customer_id,
                email: idExsists.email,
                contact_no: idExsists.contact_no,
                managerName: idExsists.manager_name,
                password: newPassword

            }

            console.log('isAdmin', isAdmin);
            if (verifiedMail) {

                // if (isAdmin) {
                    await sendBOOnBoardSMS(idExsists.owner_name, idExsists.manager_name, idExsists.customer_id, idExsists.contact_no)
                // }
          
                console.log("mailInfo====>",mailInfo)

                await sendMailToBo(verifiedMail.email, mailInfo);
                return res.status(200).json({ success: true, message: "Email Verified" });
            }
        }

        return res.status(404).json({ success: false, message: "Verification Failed" });
    } catch (error) {
        console.log('Mail Verification Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

//methoed for getting list of all bo and their associated shop(or fbo)
/*exports.getClientList = async (req, res) => {

    try {

         const clientList = await fboModel.aggregate([
            {
                $match: {
                    "created_by": {
                        $not: {
                            $regex: "admin",
                            $options: "i"
                        }
                    }
                } 
            },
            {
                $lookup: { //lookup with fbo collection for getting all the fbo related to this bo in array
                    from: 'bo_registers',
                    localField: 'boInfo',
                    foreignField: '_id',
                    as: 'boInfo'
                },
            },
            {
                $unwind: "$boInfo"
            },
            {
                $group: {
                    "_id": "$boInfo._id",
                    "contact_no": {$first: "$boInfo.contact_no"},
                    "email": {$first: "$boInfo.email"},
                    "customer_id": {$first: "$boInfo.customer_id"},
                    "owner_name": {$first: "$boInfo.owner_name"},
                    "business_entity": {$first: "$boInfo.business_entity"},
                    "business_ownership_type": {$first: "$boInfo.business_ownership_type"},
                    "business_category": {$first: "$boInfo.business_category"},
                    "manager_name": {$first: "$boInfo.manager_name"},
                    "createdAt": {$first: "$boInfo.createdAt"},
                    "fbo": {
                        $push: {
                            "_id": "$_id",
                            "fbo_name": "$fbo_name",
                            "owner_name": "$owner_name",
                            "customer_id": "$customer_id",
                            "createdAt": "$createdAt",
                            "state": "$state",
                            "district": "$district",
                            "address": "$address",
                            "pincode": "$pincode",
                            "business_type": "$business_type",
                            "gst_number": "$gst_number",
                            "owner_contact": "$owner_contact",
                            "email": "$email"
                        }
                    }
                }
            },
            {
                $sort: {
                    "createdAt": -1
                }
            }
        ],{
           allowDiskUse: true
        });
        return res.status(200).json({ clientList: clientList });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}*/
exports.getClientList = async (req, res) => {
    try {
        const { page = 1, limit = 2000 } = req.query; // Defaults to page 1 with 10 records per page

        const clientList = await fboModel.aggregate([
            {
                $match: {
                    "created_by": {
                        $not: {
                            $regex: "admin",
                            $options: "i"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'bo_registers',
                    localField: 'boInfo',
                    foreignField: '_id',
                    as: 'boInfo'
                }
            },
            {
                $unwind: "$boInfo"
            },
            {
                $group: {
                    "_id": "$boInfo._id",
                    "contact_no": { $first: "$boInfo.contact_no" },
                    "email": { $first: "$boInfo.email" },
                    "customer_id": { $first: "$boInfo.customer_id" },
                    "owner_name": { $first: "$boInfo.owner_name" },
                    "business_entity": { $first: "$boInfo.business_entity" },
                    "business_ownership_type": { $first: "$boInfo.business_ownership_type" },
                    "business_category": { $first: "$boInfo.business_category" },
                    "manager_name": { $first: "$boInfo.manager_name" },
                    "createdAt": { $first: "$boInfo.createdAt" },
                    "fbo": {
                        $push: {
                            "_id": "$_id",
                            "fbo_name": "$fbo_name",
                            "owner_name": "$owner_name",
                            "customer_id": "$customer_id",
                            "createdAt": "$createdAt",
                            "state": "$state",
                            "district": "$district",
                            "address": "$address",
                            "pincode": "$pincode",
                            "business_type": "$business_type",
                            "gst_number": "$gst_number",
                            "owner_contact": "$owner_contact",
                            "email": "$email"
                        }
                    }
                }
            },
            {
                $sort: { "createdAt": -1 }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: parseInt(limit)
            }
        ], {
            allowDiskUse: true
        });

        // Get total count for pagination
        const totalRecords = await fboModel.countDocuments({
            "created_by": {
                $not: {
                    $regex: "admin",
                    $options: "i"
                }
            }
        });

        return res.status(200).json({
            clientList,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: page
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateBusinessOwner = async (req, res) => {
    try {
      const { boId, city_Id, business_category_ID } = req.body;
  
      if (!boId) {
        return res.status(400).json({ success: false, message: "boId is required" });
      }
  
      const updateFields = {};
      if (city_Id) updateFields.city_Id = city_Id;
      if (business_category_ID) updateFields.business_category_ID = business_category_ID;
  
      const updatedBO = await boModel.findOneAndUpdate(
        { customer_id: boId }, // or use { customer_id: boId } depending on frontend
        { $set: updateFields },
        { new: true }
      );
      const mailInfo = {
        purpose: 'update_account',
        boName: updatedBO.owner_name,
        customerId: updatedBO.customer_id,
        email: updatedBO.email
      };
  
      await sendMailToBo(updatedBO.email, mailInfo);
  
      if (!updatedBO) {
        return res.status(404).json({ success: false, message: "Business Owner not found" });
      }
  
      return res.status(200).json({ 
        success: true, 
        message: "Business Owner updated successfully",
        updatedData: updatedBO
      });
  
    } catch (error) {
      console.error("Error updating Business Owner:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  


  exports.createCustomerForBo = async (req, res) => {
    try {
      const { boId } = req.body;
      console.log("📌 Received BO ID:", boId);
  
      if (!boId) {
        return res.status(400).json({ success: false, message: "Business Owner ID is required" });
      }
  
      const bo = await boModel.findOne({ customer_id: boId });
  
      if (!bo) {
        return res.status(404).json({ success: false, message: "Business Owner not found" });
      }
  
      const existingCustomer = await customerModel.findOne({ business_owner_ref_id: bo._id });
  
      if (existingCustomer) {
        return res.status(409).json({ success: false, message: "Customer already exists for this Business Owner" });
      }
  
      const employee = await employeeSchema.findById(bo.onboard_by);
      const newPassword = await generateRandomPassword();
  
      const newCustomer = await customerModel.create({
        business_owner_ref_id: bo._id,
        customer_name: bo.manager_name,
        iiest_member_id: bo.customer_id,
        username: bo.customer_id,
        password: newPassword,
        email: bo.email,
        contact_no: bo.contact_no,
        created_by: employee?._id,
        business_category_ID: bo.business_category_ID,
        city_Id: bo.city_Id
      });
  
      const mailInfo = {
        boName: bo.owner_name,
        purpose: 'onboard',
        customerId: bo.customer_id,
        email: bo.email,
        contact_no: bo.contact_no,
        managerName: bo.manager_name,
        password: newPassword
      };
  
      await sendMailToBo(bo.email, mailInfo);
  
      return res.status(201).json({ success: true, message: "Customer created successfully", customer: newCustomer });
  
    } catch (error) {
      console.error("Create Customer Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  