const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) {
    return res.status(400).json({ error: "Invalid username" });
  }
  if (user.password !== req.body.password) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username, password: user.password },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10h" }
  );
  res.cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 });
  res.status(200).json({ error: null });
});

exports.verify = asyncHandler(async(req, res, (next) => {}));
