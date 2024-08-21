const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load the secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const adminCheck = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the user's role is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    // Proceed to the next middleware or route handler
    req.user = decoded; // Attach user information to request object if needed
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = adminCheck;
