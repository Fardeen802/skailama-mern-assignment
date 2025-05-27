const jwt = require('jsonwebtoken');

// Replace with environment variables in production
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

let refreshTokens = [];

// Middleware to verify Access Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Generate new Access & Refresh tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
};

// Refresh token endpoint logic
const refreshAccessToken = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token expired or invalid' });
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    res.json({ accessToken: newAccessToken });
  });
};

// Check if token is expired manually (utility, not middleware)
const isTokenExpired = (token, secret = ACCESS_TOKEN_SECRET) => {
  try {
    const decoded = jwt.verify(token, secret);
    return false; // Not expired
  } catch (err) {
    return err.name === 'TokenExpiredError';
  }
};
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
  
    if (!token) return res.status(401).json({ message: 'No token found in cookies' });
  
    jwt.verify(token, 'ACCESS_SECRET', (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired token' });
      console.log("Decoded token:", decoded);
      req.user = decoded;
      next();
    });
  };
// Revoke refresh token
const revokeRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter(t => t !== token);
};

module.exports = {
  authenticateToken,
  generateTokens,
  refreshAccessToken,
  isTokenExpired,
  revokeRefreshToken,
  verifyToken
};
