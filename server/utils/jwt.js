
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = "your_access_secret"; // store in .env in real apps
const REFRESH_TOKEN_SECRET = "your_refresh_secret";

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => jwt.verify(token, ACCESS_TOKEN_SECRET);
const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_TOKEN_SECRET);

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
