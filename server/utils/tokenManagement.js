const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// ✅ Used for protected routes (can refresh if access token expired)
const verifyToken = (req, res, next) => {
  console.log('🔍 Verifying token...');
  console.log('Cookies:', req.cookies);

  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    console.log('❌ No tokens found');
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (!accessToken) {
    console.log('⚠️ No access token, trying refresh token');
    return tryRefreshToken(req, res, next, refreshToken);
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    console.log('✅ Access token verified successfully');
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Access token verification failed:', err.message);
    if (refreshToken) {
      return tryRefreshToken(req, res, next, refreshToken);
    }
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Creates new access token from refresh token
const tryRefreshToken = (req, res, next, refreshToken) => {
  if (!refreshToken) {
    console.log('❌ No refresh token available');
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log('✅ Refresh token verified, creating new access token');

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
      path: '/',
    });

    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Refresh token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// ✅ Used for checking login status (does NOT refresh)
const verifyLoginOnly = (req, res, next) => {
  console.log('🔍 Verifying login via access token only');
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    console.log('❌ No access token found');
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    console.log('✅ Access token valid:', decoded);
    req.user = decoded;
    next(); // ✅ allow next handler to send response
  } catch (err) {
    console.log('❌ Invalid or expired access token:', err.message);
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};


module.exports = {
  verifyToken,
  tryRefreshToken,
  verifyLoginOnly,
};
