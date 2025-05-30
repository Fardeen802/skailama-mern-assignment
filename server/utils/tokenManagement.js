const jwt = require('jsonwebtoken');
require('dotenv').config();

// Replace with environment variables in production
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ;


const verifyToken = (req, res, next) => {
  console.log('Verifying token...');
  console.log('Cookies:', req.cookies);
  console.log('Auth Header:', req.headers.authorization);

  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    console.log('No tokens found');
    return res.status(401).json({ message: 'No tokens available' });
  }

  if (!accessToken) {
    console.log('No access token, trying refresh token');
    return tryRefreshToken(req, res, next, refreshToken);
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Access token verification failed:', err.message);
      return tryRefreshToken(req, res, next, refreshToken);
    }

    console.log('Access token verified successfully');
    req.user = decoded;
    next();
  });
};

const tryRefreshToken = (req, res, next, refreshToken) => {
  if (!refreshToken) {
    console.log('No refresh token available');
    return res.status(401).json({ message: 'No refresh token available' });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Refresh token verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    console.log('Refresh token verified, creating new access token');
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 15 * 60 * 1000,
      domain: '.onrender.com',
      path: '/'
    });

    req.user = decoded;
    next();
  });
};


module.exports = {
  verifyToken,
  tryRefreshToken
};
