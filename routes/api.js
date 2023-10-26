const router = require("express").Router();
const userAuth = require("../controllers/userAuth");
const postsController = require("../controllers/postsController");
const authentication = require("../middleware/authentication");

//Routes for the blog

router.get(
  "/posts/latest",

  postsController.getLatestPosts
);

router.get("/posts", postsController.viewPosts);

router.put(
  "/posts/:id/comments",

  postsController.addComment
);

router.get("/posts/:id", postsController.viewPost);

//Routes for the blog cms

router.post("/login", userAuth.login);

router.use(authentication);

router.get("/auth/posts", postsController.viewPosts);

router.get("/auth/posts/:id", postsController.viewPost);

router.post("/auth/posts/new", postsController.newPost);

router.put("/auth/posts/:id", postsController.updatePost);

router.delete("/auth/posts/:id", postsController.deletePost);

router.delete(
  "/auth/posts/:postId/comments/:commentId",
  postsController.deleteComment
);

module.exports = router;
