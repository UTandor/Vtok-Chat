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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((result) => {
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
