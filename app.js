require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.options("/auth/posts/:id", cors());
app.options("/auth/posts/:postId/comments/:commentId", cors());

app.use(cors());

//production config
const compression = require("compression");
app.use(compression());

const helmet = require("helmet");
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
});
app.use(limiter);

const apiRouter = require("./routes/api");

//Mongo connection setup
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL_PROD, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("Could not connect to the database", err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/api", apiRouter);

module.exports = app;
