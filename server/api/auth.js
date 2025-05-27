const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {
  generateTokens,
  refreshAccessToken,
  revokeRefreshToken,
  verifyToken
} = require('../utils/tokenManagement');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: existingUser._id }, 'ACCESS_SECRET', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: existingUser._id }, 'REFRESH_SECRET', { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
    sameSite: 'Strict',
    secure: false, // true in production
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false, // true in production
  });

  return res.status(200).json({ message: 'Logged out successfully' });
});
module.exports = router;