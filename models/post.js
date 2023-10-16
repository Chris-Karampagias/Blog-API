const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const postSchema = new Schema({
  title: { type: String, maxLength: 50, required: true },
  image: { type: String, required: true },
  description: { type: String, maxLength: 500, required: true },
  postedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
});

postSchema.virtual("postedAtFormatted").get(function () {
  return DateTime.fromJSDate(this.postedAt).toLocaleString(
    DateTime.DATETIME_MED
  );
});

postSchema.virtual("updatedAtFormatted").get(function () {
  return DateTime.fromJSDate(this.updatedAt).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Posts", postSchema);
