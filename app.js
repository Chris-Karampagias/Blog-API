require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

const apiRouter = require("./routes/api");

//Mongo connection setup
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL_DEV, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.log("Could not connect to the database", err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

module.exports = app;
