const jwt = require('jsonwebtoken');

// Replace with environment variables in production
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

let refreshTokens = [];

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return tryRefreshToken(req, res, next, refreshToken);
  }

  jwt.verify(accessToken, 'ACCESS_SECRET', (err, decoded) => {
    if (err) {
      // Access token expired or invalid, try refreshing
      return tryRefreshToken(req, res, next, refreshToken);
    }

    req.user = decoded;
    next();
  });
};

const tryRefreshToken = (req, res, next, refreshToken) => {
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token available' });
  }

  jwt.verify(refreshToken, 'REFRESH_SECRET', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    // Create a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      'ACCESS_SECRET',
      { expiresIn: '15m' }
    );

    // Set new access token in cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    req.user = decoded;
    next();
  });
};

const revokeRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter(t => t !== token);
};

module.exports = {
  verifyToken,revokeRefreshToken
};
