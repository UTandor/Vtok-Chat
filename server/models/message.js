const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Messages", MessageSchema);
module.exports = Message;
