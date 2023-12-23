const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", (req, res) => {
  const { name, password } = req.body;
  User.create({
    name: name,
    password: password,
  })
    .then((result) =>
      res.json({
        result: result,
        message: `User '${result.name}' with password '${result.password}' has been successfully created!`,
      })
    )
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  User.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.post("/login", (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.status(200).json("Login successful!");
        } else {
          res.status(401).json("Invalid password.");
        }
      } else {
        res.status(404).json("User not found.");
      }
    })
    .catch((err) => {
      res.status(500).json("Server error.");
    });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((User) => {
      User.completed = !User.completed;
      return User.save();
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

router.delete("/:name", (req, res) => {
  const { name } = req.params;
  User.findOneAndDelete({ name })
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "User deleted succesffuly" });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;
