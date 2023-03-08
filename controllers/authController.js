const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
  });
  await user.save();
  res.status(201).json(user);
});

exports.login = asyncHandler(async (req, res, next) => {
  const data = await User.findOne({ where: { email: req.body.email } });
  const user = data.toJSON();
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid username or password. Please try again.", 400));
  }
  const token = generateToken(user.id);
  res.status(200).json({ data: user, token });
});
