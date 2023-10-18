const Posts = require("../models/post");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");

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
        image: req.file.path,
        description: req.body.description,
        postedAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
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

exports.viewPost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id).exec();
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.json(error.message);
  }
};

exports.updatePost = [
  upload.single("image"),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const post = await Posts.findById(req.params.id);
      if (req.file) {
        const postsUsingOldImage = await Posts.find({
          image: post.image,
        })
          .countDocuments()
          .exec();
        if (postsUsingOldImage === 1) {
          fs.unlink(`./${post.image}`, (error) => {
            if (error) {
              throw error;
            }
          });
        }
        const updatedPost = new Posts({
          _id: post._id,
          title: req.body.title.replace("&#x27;", "'"),
          description: req.body.description,
          image: req.file.path,
          postedAt: post.postedAt,
          updatedAt: new Date(Date.now()),
          comments: req.body.comments,
        });
        await Posts.findByIdAndUpdate(post._id, updatedPost);
      } else {
        const updatedPost = new Posts({
          _id: post._id,
          title: req.body.title.replace("&#x27;", "'"),
          description: req.body.description,
          image: post.image,
          postedAt: post.postedAt,
          updatedAt: new Date(Date.now()),
          comments: req.body.comments,
        });
        await Posts.findByIdAndUpdate(post._id, updatedPost);
      }

      res.status(200).json({ error: null });
    } catch (error) {
      res.json({ error });
    }
  },
];

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id).exec();
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }
    const postsUsingOldImage = await Posts.find({
      image: post.image,
    })
      .countDocuments()
      .exec();
    if (postsUsingOldImage === 1) {
      fs.unlink(`./${post.image}`, (error) => {
        if (error) {
          throw error;
        }
      });
    }
    await Posts.findByIdAndDelete(req.params.id);
    res.status(200).json({ error: null });
  } catch (error) {
    res.json({ error });
  }
};

exports.getLatestPosts = async (req, res, next) => {
  try {
    const latestPosts = await Posts.find({}, "title description image")
      .sort({ postedAt: -1 })
      .limit(3)
      .exec();
    res.json(latestPosts);
  } catch (err) {
    res.json(err);
  }
};

exports.addComment = async (req, res, next) => {};
