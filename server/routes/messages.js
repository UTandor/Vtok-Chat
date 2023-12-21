const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/", (req, res) => {
  const { message, sentBy } = req.body;
  Message.create({
    content: message,
    sentBy: sentBy,
    createdAt: Date.now(),
  })
    .then((result) => {
      res.status(200).json({
        result: result,
        message: `Message of user ${sentBy} sent successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});

module.exports = router;
