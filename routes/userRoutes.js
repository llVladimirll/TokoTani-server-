const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// Register new user
router.post("/register", async (req, res) => {
  console.log("Register endpoint called");
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    const newUser = await user.save();
    console.log("User registered successfully");
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error in registration:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
