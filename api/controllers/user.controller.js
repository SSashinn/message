const User = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup_post = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must not be empty")
    .isLength({max:12})
    .withMessage("Username must not exceed 12 letters")
    .custom(async (value) => {
      const username = await User.exists({ username: value });
      // if username is already taken, throw error
      if (username) {
        throw new Error("User already exists");
      };
    }),

  body('password')
    .isLength({ min: 1 })
    .escape()
    .withMessage("Enter a Password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    } else {
      bcryptjs.hash(password, 10, async (err, hashedPassword) => {
        if (err)
          next(err);
        else {
          const newUser = new User({ username, password: hashedPassword });
          try {
            await newUser.save();
            res.status(201).json({
              status: 201,
              message: 'User created successfully'
            });
          } catch (error) {
            next(error);
          };
        };
      });
    };
  }),
];

exports.signin_post = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must not be empty")
    .isLength({max:12})
    .withMessage("Username must not exceed 12 letters"),

  body('password')
    .isLength({ min: 1 })
    .escape()
    .withMessage("Enter a Password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        errors: errors.array()
      });
    } else {
      const validUser = await User.findOne({ username });
      if (!validUser)
        return res.status(404).json({message: `User not found` });
      // Comparing password  
      const validPassword = await bcryptjs.compare(password, validUser.password);
      if (!validPassword)
        return res.status(401).json({message: `Invalid Credentials` });

      // Creating a token using jwt
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // We don't want to return password so we create a new object called rest
      const { password: pass, ...rest } = validUser._doc;
      // Saving token to cookie,
      res
        .status(200)
        .json({status: 200, userData: rest, token});
    }
  })
];

exports.signOut = asyncHandler(async(req, res) => {
    res.status(200).json('Logged Out');
})