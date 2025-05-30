const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const signUpRoute = require('./api/signUp');
const authRoute = require('./api/auth');
const projectsRoute = require('./api/userProjects');
const fileRoute = require('./api/file');
const { verifyToken } = require('./utils/tokenManagement');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// CORS configuration
const corsOptions = {
  origin: 'https://skailama-mern-assignment.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // Express 5 compatible wildcard handling

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

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// API routes
app.use('/api/signup', signUpRoute);
app.use('/api/auth', authRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/files', fileRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    path: req.path,
    params: req.params
  });
});

// Catch-all route for undefined endpoints
app.use('/{*splat}', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
