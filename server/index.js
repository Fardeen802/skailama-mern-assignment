const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const signUpRoute = require('./api/signUp');
const loginRoute = require('./api/auth');
const logoutRoute = require('./api/auth');
const projectsRoute = require('./api/userProjects');
const fileRoute = require('./api/file');
const {verifyToken} = require("./utils/tokenManagement");
const cookieParser = require('cookie-parser');
require('dotenv').config();


app.use(cors({
  origin: ['https://skailama-mern-assignment.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json()); 

// Test routes
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/api/test-auth', verifyToken, (req, res) => {
  res.json({ message: 'Authentication is working!', user: req.user });
});

app.get('/api/test-cookie', (req, res) => {
  res.json({ 
    message: 'Cookie test',
    cookies: req.cookies,
    headers: req.headers
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

mongoose.connect(
    process.env.MONGODB_URI ,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });
// On server (auth.js route maybe)

app.use("/api/files",fileRoute);
app.use("/api/auth",projectsRoute);
app.use('/api',logoutRoute);
app.use('/api',loginRoute);
app.use('/api/signup', signUpRoute); 
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });