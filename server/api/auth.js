const express = require('express');
const bcrypt = require('bcrypt'); // updated
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {
  verifyToken,
  verifyLoginOnly
} = require('../utils/tokenManagement');

require('dotenv').config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const router = express.Router();

// ✅ Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate access token
    const accessToken = jwt.sign(
      { userId: existingUser._id },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token: accessToken, // ✅ Send token to frontend
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Logout
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Client-side logout successful' });
});



// ✅ Login state check
router.get('/verify-token', verifyLoginOnly, (req, res) => {
  return res.status(200).json({ userId: req.user.userId });
});


module.exports = router;


