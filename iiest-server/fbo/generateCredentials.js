const fboModel = require('../models/fboModels/fboSchema');

const generateCustomerId = (randonNum)=>{
    let customerId = '';
    customerId = `IIEST/${randonNum}`;
    return customerId
}

const generatedInfo = async()=>{
    let isUnique = false;
    let idNumber;

    while (!isUnique) {
      idNumber = Math.floor(10000 + Math.random() * 90000);
      const existingNumber = await fboModel.findOne({ id_num: idNumber });
      if (!existingNumber) {
        isUnique = true;
      }
    }

    const generatedCustomerId = generateCustomerId(idNumber);

    return { idNumber, generatedCustomerId}
}

module.exports = generatedInfo;