const router = require("express").Router();
const userAuth = require("../controllers/userAuth");
const postsController = require("../controllers/postsController");
const authentication = require("../middleware/authentication");

router.post("/login", userAuth.login);

router.put("/post/comments", postsController.addComment);

router.get("/posts/latest", postsController.getLatestPosts);

router.use(authentication);

router.get("/posts", postsController.viewPosts);

router.post("/posts/new", postsController.newPost);

router.get("/posts/:id", postsController.viewPost);

router.put("/posts/:id", postsController.updatePost);

router.delete("/posts/:id", postsController.deletePost);

module.exports = router;
