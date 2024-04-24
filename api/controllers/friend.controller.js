const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const { ObjectId } = require('mongoose').Types;

exports.addFriend = [
  // Validation middleware for the 'username' field
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

  // Escape 'selfObjectID' field
  body('selfObjectID')
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
    const { username, selfObjectID } = req.body;
    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array(),
      });
    };

    // Find the user by username
    const user = await User.findOne({ username });
    // Check if friend request already sent
    if (user.friend_request.includes(selfObjectID)) {
      res.status(400).json({
        message: [{msg:"You have already send a friend request to this person"}],
      });
    } else {
      // If not sent, add friend request and return a 201 Created response
      await user.updateOne({ $push: { friend_request: selfObjectID } });
      res.status(201).json({
        status: 201,
        message: "Friend request successfully sent",
      })
    }
  }),
];

exports.allFriends = [
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
    const user = await User.findById(selfObjectID).populate("friends");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const request = user.friends.map(val => ({
      name: val.username,
      id: val._id
    }));
    res.status(200).json({ status: 200, request });
  })
];
