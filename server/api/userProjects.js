const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');
const { verifyToken } = require('../utils/tokenManagement');
// POST /api/projects - Create a new project for a user
router.post('/create',verifyToken, async (req, res) => {
    try {
      // Assuming req.user is set by auth middleware
      const userId = req.user.userId;
      const { title } = req.body;
        console.log("UserId",userId);
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      if (!title) {
        return res.status(400).json({ message: 'Project name is required' });
      }
  
      const project = new Project({
        userId,
        name:title,
      });
  
      await project.save();
  
      res.status(201).json({ message: 'Project created', project });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/projectsList', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId; // support both
  
      if (!userId) {
        return res.status(401).json({ message: 'User ID not found in token' });
      }
      const projectsNames = await Project.find({ userId })
                        .sort({ createdAt: -1 })
                        .select('name'); // ✅ only include the 'name' field
    //   const projectNames = projects.map(project => project.name);
  
      res.status(200).json({ projectsNames,message:"SUCCESS" });
    } catch (error) {
      console.error('Error fetching user projects:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;


