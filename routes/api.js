const router = require("express").Router();
const userAuth = require("../controllers/userAuth");
const postsController = require("../controllers/postsController");
const authentication = require("../middleware/authentication");
const cors = require("cors");

const corsOptionsCMS = {
  origin: "https://blog-cms-delta-peach.vercel.app",
  optionsSuccessStatus: 200,
};

const corsOptionsBlog = {
  origin: "https://blog-gamma-cyan-31.vercel.app",
  optionsSuccessStatus: 200,
};

//Routes for the blog

router.get(
  "/posts/latest",
  cors(corsOptionsBlog),
  postsController.getLatestPosts
);

router.get("/posts", cors(corsOptionsBlog), postsController.viewPosts);

router.put(
  "/posts/:id/comments",
  cors(corsOptionsBlog),
  postsController.addComment
);

router.get("/posts/:id", cors(corsOptionsBlog), postsController.viewPost);

//Routes for the blog cms

router.post("/login", cors(corsOptionsCMS), userAuth.login);

router.use(authentication);

router.get("/auth/posts", cors(corsOptionsCMS), postsController.viewPosts);

router.get("/auth/posts/:id", cors(corsOptionsCMS), postsController.viewPost);

router.post("/auth/posts/new", cors(corsOptionsCMS), postsController.newPost);

router.put("/auth/posts/:id", cors(corsOptionsCMS), postsController.updatePost);

router.delete(
  "/auth/posts/:id",
  cors(corsOptionsCMS),
  postsController.deletePost
);

router.delete(
  "/auth/posts/:postId/comments/:commentId",
  cors(corsOptionsCMS),

  postsController.deleteComment
);

module.exports = router;
