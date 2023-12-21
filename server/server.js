const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const dbUrl =
  "mongodb+srv://ancrobot2244:deI3RAmjxFgKOgDe@cluster0.bhgwkdm.mongodb.net/test";

app.use(cors());
app.use(express.json());

mongoose.connect(dbUrl);
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
