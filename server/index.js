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
const cors = require('cors');

const corsOptions = {
  origin: ['https://skailama-mern-assignment.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));


// Middleware
app.use(cookieParser());
app.use(express.json());
// app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Basic welcome
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Auth token check
app.get('/api/verify-token', verifyToken, (req, res) => {
  console.log('✅ Token verification successful');
  res.status(200).json({
    message: 'Token is valid',
    user: req.user,
    cookies: Object.keys(req.cookies)
  });
});

// Test routes
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

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/signup', signUpRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/files', fileRoute);

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ✅ Fixed catch-all 404 route
// Catch-all route for undefined endpoints
app.use((req, res) => {
  console.log('❌ Route not found:', req.originalUrl);
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
