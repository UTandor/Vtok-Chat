const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

const dbUrl =
  "mongodb+srv://ancrobot2244:deI3RAmjxFgKOgDe@cluster0.bhgwkdm.mongodb.net/production";

const corsOptions = {
  origin: "https://vtok.netlify.app",
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(dbUrl);

const userRouter = require("../routes/users");
const messageRouter = require("../routes/messages");

router.use("/users", userRouter);
router.use("/messages", messageRouter);

router.get("/", (req, res) => {
  res.send("HHAA");
});
// Define your routes
app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);
