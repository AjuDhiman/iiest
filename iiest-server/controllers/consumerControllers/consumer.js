
const jwt = require("jsonwebtoken");
const customerSchema = require("../../models/customerModel/customerModel");
const { shopModel, recipientModel } = require("../../models/fboModels/recipientSchema");
const salesModel = require("../../models/employeeModels/employeeSalesSchema");
const docsModel = require("../../models/operationModels/documentsSchema");
const { getDocObject } = require("../../config/s3Bucket");
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
    const { boId } = req.query; // Use req.query for query parameters
    const shopDetails = await shopModel.findOne({ boId });
    const shopDocumentDetails = await docsModel.findOne({ 
      handlerId:  shopDetails.shopId, 
  }).lean();
    const statistics = {
      completedCompliances: 1,
      pendingCompliances: 8,
      durationInMonths: 6,
    };

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

exports.getShopLicenses = async (req, res) => {
  try {
    let success = true;
    const { boId } = req.query; // Use req.query for query parameters
    console.log("boId===>",boId)

    if (!boId) {
      return res.status(400).json({ success: false, message: "boId is required" });
    }
    const foscosObject = {};
    const docObject = {};
      const foscosStatus = "Pending";
    const shopDetails = await shopModel.findOne({ boId });
    if (shopDetails) {
      const employeeSales = await salesModel.findOne({ _id: shopDetails.salesInfo });
      if (!employeeSales) {
        return res.status(404).json({ success: false, message: "Employee sales details not found" });
      }
      this.foscosStatus = "initiated";

      this.foscosObject = employeeSales.foscosInfo
      const shopDocumentDetails = await docsModel.findOne({ 
        handlerId:  shopDetails.shopId, 
        name: "Foscos License" 
    }).lean();
      if (shopDocumentDetails) {
        this.foscosStatus = "Completed";
        this.docObject = shopDocumentDetails;
        console.log(" this.docObject.src===>", this.docObject)

        this.docObject.src = await getDocObject(this.docObject.src[0]);
        console.log(" this.docObject.src===>", this.docObject.src)
    } else {
        this.docObject = null; 
    }
 }
    const licenses = [
      { id: 1, name: 'Health Trade License', status: 'Pending' },
      { id: 2, name: 'FSSAI License', status: this.foscosStatus, object : this.foscosObject,docObject:this.docObject },
      { id: 3, name: 'Shop Estd. Registration', status: 'Pending' },
      { id: 4, name: 'Food Training', status: 'Pending' },
      { id: 5, name: 'Medical Certificate', status: 'Pending' },
      { id: 6, name: 'Water Testing Report', status: 'Pending' },
      { id: 7, name: 'Fire NOC', status: 'Pending' },
      { id: 8, name: 'DPCC License', status: 'Pending' },
      { id: 9, name: 'Liquor License', status: 'Pending' }
    ];

    return res.status(200).json({
      success,
      licenses,
      message: 'Shop licenses fetched successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};







