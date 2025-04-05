const { getDocObject } = require('../../config/s3Bucket');
const ChatMessage = require('../../models/chatMessegeModels/chatMessegeModal');


exports.saveMessage = async (req, res) => {
  const { shopId, boId, senderType, senderId, message } = req.body;
  if (!boId || !senderType || !senderId) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const file = req.files?.['file']?.[0];

    const chatPayload = {
      shopId,
      boId,
      senderType,
      senderId,
      timestamp: new Date()
    };

    if (message) {
      chatPayload.message = message;
    } else if (file) {
      // If message is empty but file exists, use file name as message
      chatPayload.message = `File: ${file.originalname}`;
    }

    if (file) {
      chatPayload.file = {
        fileName: file.originalname,
        fileUrl: file.key,
        mimeType: file.mimetype
      };
    }

    const saved = await new ChatMessage(chatPayload).save();

    res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.error('Error saving chat message:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



// exports.saveMessage = async (req, res) => {
//     const { boId, senderType, senderId, message } = req.body;
  
//     if (!boId || !senderType || !senderId || !message) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }
  
//     try {
//       const saved = await new ChatMessage({
//         boId,
//         senderType,
//         senderId,
//         message,
//         timestamp: new Date()
//       }).save();
  
//       res.status(200).json({ success: true, data: saved });
//     } catch (err) {
//       console.error('Error saving chat message:', err);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   };

  exports.getMessagesBySender = async (req, res) => {
    const { shopId } = req.query;
  
    if (!shopId) {
      return res.status(400).json({ success: false, message: 'senderId is required' });
    }
  
    try {
      const messages = await ChatMessage.find({ shopId }).sort({ timestamp: 1 });
      return res.status(200).json({ success: true, messages });
    } catch (err) {
      console.error('Error fetching messages by sender:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  


exports.getShopMessagesDoc = async (req, res) => {
  const { shopId } = req.query;

  if (!shopId) {
    return res.status(400).json({ success: false, message: 'shopId is required' });
  }

  try {
    let messages = await ChatMessage.find({
      shopId,
      senderType: 'shop'
    }).sort({ timestamp: 1 });

    // 🔁 Process each message to resolve file URLs using getDocObject
    const enrichedMessages = await Promise.all(
      messages.map(async (msg) => {
        if (msg.file && msg.file.fileUrl) {
          const docUrl = await getDocObject(msg.file.fileUrl);
          return {
            ...msg.toObject(),
            file: {
              ...msg.file,
              src: docUrl  
            }
          };
        }
        return msg.toObject(); // return message as-is if no file
      })
    );

    return res.status(200).json({ success: true, messages: enrichedMessages });
  } catch (err) {
    console.error('Error fetching shop messages:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

  