const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {
  verifyToken
} = require('../utils/tokenManagement');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for user:', email);
    const accessToken = jwt.sign({ userId: existingUser._id }, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: existingUser._id }, REFRESH_SECRET, { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 15 * 60 * 1000,
      domain: '.onrender.com',
      path: '/'
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: '.onrender.com',
      path: '/'
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// router.post('/refresh-token', refreshAccessToken);
router.get('/verify-token', verifyToken, (req, res) => {
  res.json({ valid: true });
});

router.post('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    domain: '.onrender.com',
    path: '/'
  });
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    domain: '.onrender.com',
    path: '/'
  });

  return res.status(200).json({ message: 'Logged out successfully' });
});
module.exports = router;