const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message.model.js');
const Dm = require('../models/dm.model.js');
const { ObjectId } = require('mongoose').Types;


exports.createDM = [
  body('selfObjectID')
  .escape()
  // Check whether the object id recived is valid
  .custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      // If not valid, return a 400 Bad Request response
      throw new Error("Invalid Id");
    }
  }),

  body('otherObjectID')
  .escape()
  // Check whether the object id recived is valid
  .custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      // If not valid, return a 400 Bad Request response
      throw new Error("Invalid Id");
    }
  }),

   // Route handler to add friend
   asyncHandler(async (req, res, next) => {
    // Retrieve validation errors
    const errors = validationResult(req);
    const {selfObjectID, otherObjectID } = req.body;
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };
    const dmExist = await Dm.findOne({
      $and: [
        { user1: { $in: [selfObjectID, otherObjectID] } },
        { user2: { $in: [selfObjectID, otherObjectID] } }
      ]
    });
    if (dmExist){
      return res.status(200).json({
        status: 200,
        message: dmExist._id,
      });
    } else {
      const newDm = new Dm({ user1: selfObjectID, user2: otherObjectID });
      try {
        await newDm.save();
        res.status(201).json({
          status: 201,
          message: newDm._id,
        });
      } catch (error) {
        next(error);
      };
    }
  }),
];

exports.sendMsg = [
  body('selfObjectID')
  .escape()
  // Check whether the object id recived is valid
  .custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      // If not valid, return a 400 Bad Request response
      throw new Error("Invalid user Id");
    }
  }),

  body('dmObjectID')
  .escape()
  // Check whether the object id recived is valid
  .custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      // If not valid, return a 400 Bad Request response
      throw new Error("Invalid DM Id");
    }
  }),

  body('message', 'Enter a message')
  .trim()
  .isLength({min:1})
  .escape(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const {selfObjectID, message, dmObjectID } = req.body;
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };
    const newMsg = new Message({body: message, author: selfObjectID, dm: dmObjectID});
    try {
      await newMsg.save();
      res.status(201).json({
        status: 201,
        message: 'Message sent successfully'
      });
    } catch (error) {
      next(error);
    };
  })
]

exports.getMsg = [
  body('dmObjectID')
  .escape()
  // Check whether the object id recived is valid
  .custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      // If not valid, return a 400 Bad Request response
      throw new Error("Invalid DM Id");
    }
  }),
  
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const {dmObjectID } = req.body;
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };
    const allMsg = await Message.find({dm: dmObjectID}).sort("time").populate("author");
    const messages = allMsg.map(msg => ({
      id: msg._id,
      time: msg.time,
      body: msg.body,
      author: msg.author.username
  }));
    res.status(200).json({
      status: 200,
      messages,
    })
  })
]

exports.sidebar = [
  body('selfObjectID')
  .escape()
  // Check whether the object id recived is valid
  .custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      // If not valid, return a 400 Bad Request response
      throw new Error("Invalid Id");
    }
  }),

  asyncHandler(async (req, res) => {
    // Retrieve validation errors
    const errors = validationResult(req);
    const {selfObjectID } = req.body;
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };

    const dms = await Dm.find({
      $or: [
        { user1:selfObjectID },
        { user2:selfObjectID}
      ]
    }).populate(["user1","user2"]);

    const dm = dms.map(dm => ({
      id: dm._id,
      user: dm.user1._id === selfObjectID ? dm.user1.username:dm.user2.username,
  }));
   res.json({status:200,dm})
  }),
];