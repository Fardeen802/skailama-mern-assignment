const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Project = require('../models/project.model');
const {
  verifyToken
} = require('../utils/tokenManagement');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

router.post('/login', async (req, res) => {
  try {
    console.log('🔍 Login attempt received:', { email: req.body.email });
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      console.log('❌ Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Login successful for user:', email);
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

    return res.status(200).json({ 
      message: 'Login successful',
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

// router.post('/refresh-token', refreshAccessToken);
router.get('/verify-token', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
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

// Get user's projects with file information
router.get('/projectsList', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('🔍 Fetching projects for user:', userId);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const projectsNames = await Project.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'files',
          localField: '_id',
          foreignField: 'projectId',
          as: 'files',
        },
      },
      {
        $addFields: {
          fileCount: { $size: '$files' },
          lastEdited: { $max: '$files.updatedAt' },
          created: {
            $cond: {
              if: { $gt: [{ $size: '$files' }, 0] },
              then: { $min: '$files.uploadedAt' },
              else: '$createdAt'
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          fileCount: 1,
          lastEdited: 1,
          created: 1,
        },
      },
      { $sort: { lastEdited: -1 } },
    ]);

    console.log('✅ Found projects:', projectsNames.length);
    res.status(200).json({ projectsNames, message: "SUCCESS" });
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Create new project
router.post('/create', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title } = req.body;
    console.log('🔍 Creating project:', { userId, title });

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!title) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = new Project({
      userId,
      name: title,
    });

    await project.save();
    console.log('✅ Project created:', project);
    res.status(201).json({ message: 'Project created', project });
  } catch (error) {
    console.error('❌ Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;