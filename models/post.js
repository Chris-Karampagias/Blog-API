const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, maxLength: 50, required: true },
  image: { type: Buffer, contentType: String, required: true },
  description: { type: String, maxLength: 500, required: true },
  postedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [
    { type: Schema.Types.ObjectId, ref: "Comment", default: undefined },
  ],
});

module.exports = mongoose.model("Posts", postSchema);
