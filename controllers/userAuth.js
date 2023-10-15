const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ error: "Invalid username" });
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });
  res.status(200).json({ error: null, token });
});
