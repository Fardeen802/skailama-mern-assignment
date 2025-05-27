const express = require('express');
const router = express.Router();
const File = require("../models/file.model");

// Create a new file for a given project
router.post('/create', async (req, res) => {
    try {
      const { projectId, filename, transcript } = req.body;
        console.log(projectId, filename, transcript);
      if (!projectId || !filename) {
        return res.status(400).json({ error: 'projectId and filename are required' });
      }
  
      const newFile = new File({ projectId, filename, transcript });
      const savedFile = await newFile.save();
  
      res.status(201).json(savedFile);
    } catch (error) {
      console.error('Create file error:', error);
      res.status(500).json({ error: 'Server error while creating file' });
    }
  });

// Get all files for a specific project
router.post('/list', async (req, res) => {
    const { projectId } = req.body;
  
    if (!projectId) {
      return res.status(400).json({ error: 'projectId is required' });
    }
  
    try {
      const files = await File.find({ projectId }).sort({ uploadedAt: -1 });
      console.log("Files",files);
      res.json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ error: 'Failed to fetch files' });
    }
  });
  

module.exports = router;
