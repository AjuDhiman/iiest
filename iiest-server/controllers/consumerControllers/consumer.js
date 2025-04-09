
const jwt = require("jsonwebtoken");
const customerSchema = require("../../models/customerModel/customerModel");
const { shopModel, recipientModel } = require("../../models/fboModels/recipientSchema");
const salesModel = require("../../models/employeeModels/employeeSalesSchema");
const docsModel = require("../../models/operationModels/documentsSchema");
const { getDocObject } = require("../../config/s3Bucket");
const BusinessTypeModel = require("../../models/BusinessTypeModel/BusinessTypeModel");
const citiesModel = require("../../models/CitiesModels/CitiesModels");
const BusinessCityLicense = require("../../models/businessCityLicenseModels/businessCityLicenseModel");
const mongoose = require("mongoose");
const License = require("../../models/licensesModel/licensesModel");
const { sendPasswordChangeMail } = require("./changePasswordMail");



const auth = JSON.parse(process.env.AUTH);

const JWT_SECRET = auth.JWT_TOKEN;

exports.consumerLogin = async (req, res) => {
  try {
    let success = false;
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success, message: "All fields are required" });
    }    // Check if User Exists
    const consumer_user = await customerSchema.findOne({ username });

    if (!consumer_user) {
      return res.status(401).json({ success, message: "Invalid Username or Password" });
    }

    // Password Comparison
    const passwordCompare  = (password == consumer_user.password ? 1 :0 );
    //= await bcrypt.compare(password, consumer_user.password);
    if (!passwordCompare) {
        return res.status(401).json({ success, message: "Please try to login with correct credentials" });
    }

    // JWT Token Generation
    const data = {
      user: {
        id: consumer_user._id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
    success = true;

    return res.status(200).json({
        success,
        authToken,
        consumer: {
          _id: consumer_user._id,
          iiest_member_id: consumer_user.iiest_member_id,
          customer_name: consumer_user.customer_name,
          username: consumer_user.username,
          password: consumer_user.password,
          contact_no: consumer_user.contact_no,
          email: consumer_user.email,
          is_email_verified: consumer_user.is_email_verified,
          is_contact_verified: consumer_user.is_contact_verified,
          business_owner_ref_id: consumer_user.business_owner_ref_id,
          created_at: consumer_user.created_at,
          __v: consumer_user.__v,
          business_category_ID:consumer_user.business_category_ID,
          city_Id:consumer_user.city_Id,
          userType: "consumer"
        },  
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getComplianceStatistics = async (req, res) => {
  try {
    let success = true;
    const { boId } = req.query;

    if (!boId) {
      return res.status(400).json({ success: false, message: "boId is required" });
    }

const shopDetails = await shopModel.findOne({ boId });


    let statistics = {
      completedCompliances: 1,
      pendingCompliances: 8,
      durationInMonths: 6,
    };
console.log("shopDetails--->",shopDetails)
    if(shopDetails){
      const shopDocumentDetails = await docsModel.findOne({ handlerId:shopDetails.shopId }).lean();
      const shopPhotoDoc = shopDocumentDetails?.documents.find(doc => doc.name === "Shop Photo");
      if (shopPhotoDoc && shopPhotoDoc.src) {
        const srcObject = await getDocObject(shopPhotoDoc.src);
        if (srcObject) {
          statistics.srcObject = srcObject;
        }
  }
    if (!shopDetails) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }
  }
    return res.status(200).json({
      success,
      statistics,
      message: 'Compliance statistics fetched successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



// exports.getShopLicenses = async (req, res) => {
//   try {
//     let success = true;
//     const { boId } = req.query; // Use req.query for query parameters
//     console.log("boId===>",boId)

//     if (!boId) {
//       return res.status(400).json({ success: false, message: "boId is required" });
//     }
//     let foscosObject = null;
//     let docObject = null;
//     let employeeSales = null; // Declare variable for employeeSales

    
//     let foscosStatus = "Pending";
//     let shopDetails = await shopModel.findOne({ boId });
//     console.log("shopDetails==>",shopDetails)
//     if (shopDetails) {
//      employeeSales = await salesModel.findOne({ _id: shopDetails.salesInfo });
//       if (!employeeSales) {
//         return res.status(404).json({ success: false, message: "Employee sales details not found" });
//       }
//       foscosStatus = "initiated";
// console.log("employeeSales==>",employeeSales)
//       foscosObject = employeeSales.foscosInfo
      
//       const shopDocumentDetails = await docsModel.findOne({ 
//         handlerId:  shopDetails.shopId, 
//         // name: "Foscos License" 
//     }).lean();
    
//     const foscosLicense = shopDocumentDetails?.documents?.find(doc => doc.name === "Foscos License");
    
//     if (foscosLicense) {
//         foscosStatus = "Completed";
//         docObject = shopDocumentDetails;
//         docObject.src = await getDocObject(foscosLicense.src);
//     } else {
//         docObject = null; 
//     }
//  }
//     const licenses = [
//       { id: 1, name: 'Health Trade License', status: 'Pending' },
//       { id: 2, name: 'FSSAI License', status: foscosStatus, object : foscosObject,docObject:docObject,employeeSalesObject:employeeSales },
//       { id: 3, name: 'Shop Estd. Registration', status: 'Pending' },
//       { id: 4, name: 'Food Training', status: 'Pending' },
//       { id: 5, name: 'Medical Certificate', status: 'Pending' },
//       { id: 6, name: 'Water Testing Report', status: 'Pending' },
//       { id: 7, name: 'Fire NOC', status: 'Pending' },
//       { id: 8, name: 'DPCC License', status: 'Pending' },
//       { id: 9, name: 'Liquor License', status: 'Pending' }
//     ];

//     return res.status(200).json({
//       success,
//       licenses,
//       message: 'Shop licenses fetched successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

// exports.getAllEmployeeSales = async (req, res) => {
//   try {
//     let success = true;
//     const { boId } = req.query; 
//     let shopDetails = await shopModel.findOne({ boId });
//     console.log("shopDetails===>",shopDetails)
//     if (shopDetails) {
//      employeeSales = await salesModel.find({ _id: shopDetails.salesInfo });
//     }
//     console.log("employeeSales=====>",employeeSales);

//     return res.status(200).json({
//       success,
//       employeeSales,
//       message: 'employee Sales fetched successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };





exports.getShopLicenses = async (req, res) => {
  try {
    let success = true;
    const { boId,shopId, city_id, business_type_id } = req.query;

    if (!boId || !city_id || !business_type_id) {
      return res.status(400).json({ success: false, message: "boId, city_id, and business_type_id are required" });
    }

    let foscosObject = null;
    let employeeSales = null;
    let foscosStatus = "Pending";
    let shopDocumentDetails = null;

    // Fetch shop details
    let shopDetails = await shopModel.findOne({ boId });
    console.log("shopDetails==>", shopDetails);

    if (shopDetails) {
      employeeSales = await salesModel.findOne({ _id: shopDetails.salesInfo });

      if (!employeeSales) {
        return res.status(404).json({ success: false, message: "Employee sales details not found" });
      }
      console.log("employeeSales==>",employeeSales)

      foscosStatus = "initiated";
      foscosObject = employeeSales.foscosInfo;

      shopDocumentDetails = await docsModel.findOne({ handlerId: shopId }).lean();
    }

    const businessTypeId = new mongoose.Types.ObjectId(business_type_id);
    const cityId = new mongoose.Types.ObjectId(city_id);

    const licenseData = await BusinessCityLicense.findOne ({
      business_type_id: businessTypeId,
      city_id: cityId
    })
      .populate({
        path: "mandatory_licenses",
        model: "License",
      })
      .populate({
        path: "voluntary_licenses",
        model: "License",
      });

    console.log("licenseData==>", licenseData);

    if (!licenseData) {
      return res.status(404).json({ success: false, message: "No licenses found for the given business_type_id and city_id" });
    }

    const processLicense = async (license) => {
      let status = "Pending";
      if (shopDetails && license.name.includes("FSSAI")) {
        status = "Initiated";
      }
      let licenseObject = {
        id: license._id,
        name: license.name,
        category: license.category,
        // issuing_authority: license.issuing_authority,
        // validity_years: license.validity_years,
        // description: license.description,
        status,
      };
      console.log("shopDetails==>",shopDetails)
  
      if (shopDocumentDetails && shopDocumentDetails.documents) {
        const matchingDocument = shopDocumentDetails.documents.find(doc => doc.name === license.name);

        if (matchingDocument) {
          const docUrl = await getDocObject(matchingDocument.src);
          licenseObject.status = "Completed";
          licenseObject.docObject = { ...matchingDocument, url: docUrl }; 
        }
      }

      return licenseObject;
    };

    const mandatoryLicenses = await Promise.all(licenseData.mandatory_licenses.map(processLicense));
    const VoluntaryLicenses = await Promise.all(licenseData.voluntary_licenses.map(processLicense));

    return res.status(200).json({
      success,
      licenses: {
        mandatory: mandatoryLicenses,
        Voluntary: VoluntaryLicenses,
      },
      message: "Shop licenses fetched successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



exports.getAllEmployeeSales = async (req, res) => {
  try {
    let success = true;
    const { boId } = req.query;

    if (!boId) {
      return res.status(400).json({ success: false, message: "boId is required" });
    }

    // Step 1: Find all shops under this BO
    let shops = await shopModel.find({ boId });

    if (!shops || shops.length === 0) {
      return res.status(404).json({ success: false, message: "No shops found for this BO" });
    }

    // Step 2: Collect all salesInfo from shops and flatten
    let salesIds = shops.reduce((acc, shop) => {
      if (shop.salesInfo) {
        if (Array.isArray(shop.salesInfo)) {
          acc.push(...shop.salesInfo);
        } else {
          acc.push(shop.salesInfo);
        }
      }
      return acc;
    }, []);

    if (salesIds.length === 0) {
      return res.status(404).json({ success: false, message: "No sales data found for this BO's shops" });
    }

    // Step 3: Run aggregation with collected sales IDs
    let employeeSales = await salesModel.aggregate([
      {
        $match: { _id: { $in: salesIds } }
      },
      {
        $lookup: {
          from: "fbo_registers",
          localField: "fboInfo",
          foreignField: "_id",
          as: "fboInfo"
        }
      },
      { $unwind: { path: "$fboInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "bo_registers",
          localField: "fboInfo.boInfo",
          foreignField: "_id",
          as: "fboInfo.boInfo"
        }
      },
      { $unwind: { path: "$fboInfo.boInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "staff_registers",
          localField: "employeeInfo",
          foreignField: "_id",
          as: "employeeInfo"
        }
      },
      { $unwind: { path: "$employeeInfo", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          "_id": 1,
          "grand_total": 1,
          "checkStatus": 1,
          "fboInfo.fbo_name": 1,
          "fboInfo.owner_name": 1,
          "fboInfo.email": 1,
          "fboInfo.owner_contact": 1,
          "fboInfo._id": 1,
          "fboInfo.customer_id": 1,
          "fboInfo.boInfo.customer_id": 1,
          "fboInfo.boInfo.manager_name": 1,
          "fboInfo.boInfo.business_entity": 1,
          "fboInfo.boInfo.business_category": 1,
          "fboInfo.boInfo.business_ownership_type": 1,
          "product_name": 1,
          "fboInfo.state": 1,
          "fboInfo.address": 1,
          "fboInfo.pincode": 1,
          "fboInfo.village": 1,
          "fboInfo.tehsil": 1,
          "fboInfo.district": 1,
          "fboInfo.business_type": 1,
          "fboInfo.gst_number": 1,
          "fboInfo.isBasicDocUploaded": 1,
          "fboInfo.activeStatus": 1,
          "employeeInfo.employee_name": 1,
          "fostacInfo": 1,
          "foscosInfo": 1,
          "hraInfo": 1,
          "medicalInfo": 1,
          "waterTestInfo": 1,
          "khadyaPaalnInfo": 1,
          "foodLabelingInfo": 1,
          "createdAt": 1,
          "cheque_data": 1,
          "invoiceId": 1,
          "payment_mode": 1,
          "pay_later_status": 1
        }
      }
    ]);

    return res.status(200).json({
      success,
      salesInfo: employeeSales,
      message: "Employee Sales data fetched successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



exports.getAllBusinessTypes = async (req, res) => {
  try {
    let success = true;
    
    // Fetch all business types
    const businessTypes = await BusinessTypeModel.find();

    console.log("businessTypes=====>", businessTypes);

    return res.status(200).json({
      success,
      businessTypes,
      message: "Business types fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



exports.getAllCities = async (req, res) => {
  try {
    let success = true;
    
    // Fetch all business types
    const cities = await citiesModel.find();
    return res.status(200).json({
      success,
      cities,
      message: "Cities fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



exports.getAllLicense = async (req, res) => {
  try {
    let success = true;
    
    const Licenses = await License.find();

    console.log("Licenses=====>", Licenses);

    return res.status(200).json({
      success,
      Licenses,
      message: "Licenses fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getLicensesByBusinessAndCity = async (req, res) => {
  try {
    let success = true;
   const { business_type_id, city_id } = req.query;
    if (!business_type_id || !city_id) {
    return res.status(400).json({
        success: false,
        message: "Missing required parameters: business_type_id and city_id",
      });
    }
    const businessTypeId = new mongoose.Types.ObjectId(business_type_id);
    const cityId = new mongoose.Types.ObjectId(city_id);
    const licenseData = await BusinessCityLicense.findOne ({
      business_type_id: businessTypeId,
      city_id: cityId
    })
      .populate({
        path: "mandatory_licenses",
        model: "License",
      })
      .populate({
        path: "voluntary_licenses",
        model: "License",
      });


    if (!licenseData) {
      return res.status(404).json({
        success: false,
        message: "No data found for the given business_type_id and city_id",
      });
    }

    return res.status(200).json({
      success,
      licenses: {
       mandatory_licenses: licenseData.mandatory_licenses,
       voluntary_licenses:licenseData.voluntary_licenses
      },
      message: "Licenses fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



exports.getShopsByBoId = async (req, res) => {
  const { boId } = req.query;

  if (!boId) {
    return res.status(400).json({ success: false, message: "boId is required" });
  }

  try {
    const shops = await shopModel.aggregate([
      { $match: { boId } }, 
      {
        $lookup: {
          from: "fbo_registers", 
          localField: "shopId",
          foreignField: "customer_id",
          as: "fboInfo",
        },
      },
      {
        $addFields: {
          fbo_name: { $arrayElemAt: ["$fboInfo.fbo_name", 0] },
        },
      },
      { $project: { fboInfo: 0 } },
    ]);

    if (!shops.length) {
      return res.status(404).json({ success: false, message: "No shops found for the given boId" });
    }

    // Add shop photo src to each shop object
    const enrichedShops = await Promise.all(
      shops.map(async (shop) => {
        const shopDocumentDetails = await docsModel.findOne({ handlerId: shop.shopId }).lean();
        const shopPhotoDoc = shopDocumentDetails?.documents?.find(doc => doc.name === "Shop Photo");

        if (shopPhotoDoc && shopPhotoDoc.src) {
          const srcObject = await getDocObject(shopPhotoDoc.src);
          if (srcObject) {
            shop.shopPhoto = srcObject; 
          }
        }

        return shop;
      })
    );

    return res.status(200).json({
      success: true,
      shops: enrichedShops,
      message: "Shops fetched successfully",
    });

  } catch (error) {
    console.error("Error fetching shops:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.UpdateCustomer = async (req, res) => {
  try {
    const { id, customer_name, contact_no } = req.body;

    // Validate inputs
    if (!id || !customer_name || !contact_no) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: id, customer_name, or contact_no.'
      });
    }

    // Update the customer document
    const updatedCustomer = await customerSchema.findByIdAndUpdate(id, { customer_name, contact_no }, { new: true });
   console.log("updatedCustomer==>",updatedCustomer)
    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Customer updated successfully.',
      data: updatedCustomer
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};



exports.changePassword = async (req, res) => {
  try {
    const { id, current_password, new_password } = req.body;

    // Validate input
    if (!id || !current_password || !new_password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: id, current_password, or new_password.'
      });
    }

    // Find customer by ID
    const customer = await customerSchema.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.'
      });
    }

    // Check if current password matches
    if (customer.password !== current_password) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    // Update password
    customer.password = new_password;
    await customer.save();
    await sendPasswordChangeMail(customer);

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully.'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};
