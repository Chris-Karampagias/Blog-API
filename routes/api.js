const router = require("express").Router();
const userAuth = require("../controllers/userAuth");

router.post("/login", userAuth.login);

router.get("/verify", userAuth.verify);

module.exports = router;
