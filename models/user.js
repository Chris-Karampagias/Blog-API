const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, maxLength: 20, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Users", userSchema);
