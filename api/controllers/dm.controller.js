const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
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
      $or: [
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