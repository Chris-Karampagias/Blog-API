const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, maxLength: 50, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  postedAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
});

module.exports = mongoose.model("Posts", postSchema);
