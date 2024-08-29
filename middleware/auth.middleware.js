const jwt = require("jsonwebtoken");
const secret = require("../config/secretGenerator");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json("Authorization header not provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("Token not provided or malformed");
    }

    const payload = jwt.verify(token, secret);
    console.log("Decoded payload:", payload); // Log the payload for debugging
    req.tokenPayload = payload;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json("Token not provided, invalid, or expired");
  }
};

const isAdmin = (req, res, next) => {
  if (req.tokenPayload && req.tokenPayload.role === "Admin") {
    return next();
  } else {
    console.error("Access denied. User role:", req.tokenPayload?.role);
    return res.status(403).json("Access denied. Admins only.");
  }
};

module.exports = { isAuthenticated, isAdmin };
