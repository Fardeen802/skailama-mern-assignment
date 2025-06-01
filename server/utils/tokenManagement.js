const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// ✅ Middleware for verifying token from Authorization header
const verifyToken = (req, res, next) => {
  console.log('🔍 Verifying token from header...');
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    console.log('❌ No access token provided in Authorization header');
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log('✅ Access token verified');
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Access token invalid or expired:', err.message);
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};

// ✅ Used for login status check (same logic reused)
const verifyLoginOnly = verifyToken;

module.exports = {
  verifyToken,
  verifyLoginOnly,
};
