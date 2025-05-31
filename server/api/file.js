const express = require('express');
const router = express.Router();
const File = require("../models/file.model");
const mongoose = require('mongoose');
const { verifyToken } = require('../utils/tokenManagement');

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
   
      console.log("Saved file",savedFile);
      res.status(201).json(savedFile);
    } catch (error) {
      console.error('Create file error:', error);
      res.status(500).json({ error: 'Server error while creating file' });
    }
  });

  router.post('/delete', verifyToken, async (req, res) => {
    try {
      const { _id } = req.body;
      console.log("_id",_id);
      if (!_id) {
        return res.status(400).json({ error: '_id is required' });
      }
  
      const result = await File.findByIdAndDelete(_id);
  
      if (!result) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      res.json({ message: 'SUCCESS' });
    } catch (error) {
      console.error('Error deleting in server:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Get all files for a specific project
router.post('/list', verifyToken, async (req, res) => {
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
