const express = require("express");
const User = require("../models/user.model");
const { generateTokens } = require("../utils/jwt");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { userName, password, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ userName, password, phoneNumber });
    await newUser.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens({ id: newUser._id });

    // Set cookies
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   // sameSite: "strict",
    //   // secure: process.env.NODE_ENV === "production", // true in prod
    //   maxAge: 15 * 60 * 1000, // 15 minutes
    // });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   // sameSite: "strict",
    //   // secure: process.env.NODE_ENV === "production",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

module.exports = router;
