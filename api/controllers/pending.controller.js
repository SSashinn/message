const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const { ObjectId } = require('mongoose').Types;


exports.pendingRequest = [
  body('selfObjectID')
    .escape()
    // Check whether the object id recived is valid
    .custom(async (value) => {
      if (!ObjectId.isValid(value)) {
        // If not valid, return a 400 Bad Request response
        throw new Error("Invalid Id");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };
    const { selfObjectID } = req.body;
    const user = await User.findById(selfObjectID).populate("friend_request");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const request = user.friend_request.map(val => ({
      name: val.username,
      id: val._id
    }));
    res.status(200).json({ status: 200, request });
  })
];

exports.rejectRequest = [
  body('username')
  .trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage("Username must not be empty")
  .custom(async (value, req, next) => {
    // Check if the username exists in the database
    const username = await User.exists({ username: value });
    if (!username) {
      // If username doesn't exist, throw an error
      throw new Error("Sorry, we can't find the user you are searching for");
    };
  }),

  body('selfObjectID')
    .escape()
    // Check whether the object id recived is valid
    .custom(async (value) => {
      if (!ObjectId.isValid(value)) {
        // If not valid, return a 400 Bad Request response
        throw new Error("Invalid Id");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };
    const { selfObjectID, username } = req.body;
    const user = await User.findById(selfObjectID).populate("friend_request");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Find the index of the request with the specified name
    const index = user.friend_request.findIndex(val => val.username === username);
    // If the request is found, remove it from the array
    if (index !== -1) {
      user.friend_request.splice(index, 1);
    }

    const request = user.friend_request.map(val => ({
      name: val.username,
      id: val._id
    }));
    // Save the updated user object
    await user.save();
    res.status(200).json({ status: 200, request });
  })
];