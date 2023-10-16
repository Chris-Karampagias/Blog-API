const asyncHandler = require("express-async-handler");
const Posts = require("../models/post");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

const storageStrategy = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageStrategy });

exports.newPost = [
  upload.single("image"),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty() || !req.file) {
        return res
          .status(400)
          .json({ error: [...errors.array(), { msg: "Image is required" }] });
      }
      const post = new Posts({
        title: req.body.title.replace("&#x27;", "'"),
        description: req.body.description,
        image: req.file.path,
        comments: [],
      });
      await post.save();
      res.status(200).json({ error: null });
    } catch (error) {
      res.json({ error });
    }
  },
];
exports.viewPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find({}, "title image postedAt updatedAt")
      .sort({ postedAt: -1 })
      .exec();
    if (!posts) {
      res.status(404).json({ error: "Looks like you haven't posted anything" });
    }
    res.json(posts);
  } catch (error) {
    res.json(error.message);
  }
};

exports.viewPost = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the post route" });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the update post route" });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the delete post route" });
});
