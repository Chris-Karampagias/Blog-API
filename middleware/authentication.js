const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  next();
};

module.exports = authentication;
