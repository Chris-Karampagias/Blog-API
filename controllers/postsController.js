const asyncHandler = require("express-async-handler");
const Posts = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.newPost = [
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("image", "Image is required").isLength({ min: 1 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
      }
      const post = new Posts({
        title: req.body.title.replace("&#x27;", "'"),
        description: req.body.description,
        image: req.body.image,
        comments: [],
      });

      await post.save();
      res.status(200).json({ error: null });
    } catch (error) {
      res.json({ error });
    }
  },
];
exports.viewPosts = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the posts route" });
});

exports.viewPost = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the post route" });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the update post route" });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  res.json({ message: "This is the delete post route" });
});
