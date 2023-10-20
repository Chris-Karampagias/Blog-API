const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  authorName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, maxLength: 500, required: true },
  postedAt: { type: Date, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
});

module.exports = mongoose.model("Comments", commentSchema);
