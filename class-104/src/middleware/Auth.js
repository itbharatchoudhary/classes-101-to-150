const jwt = require("jsonwebtoken");

const getUserFromToken = (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id?.toString();
  } catch {
    return null;
  }
};

module.exports = getUserFromToken;
