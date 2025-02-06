const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel');
require('dotenv').config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    await userModel.createUser(username.trim(), email.trim(), hashedPassword);
    const user = await userModel.findUserByEmail(email.trim());

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role || 'user' // Default role if not present
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(201).json({ message: 'User created successfully', token });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findUserByEmail(email.trim());
    if (!user) {
      return res.status(400).json({ error: 'No user with this email' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role || 'user' // Default role if not present
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );

    // Send response with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error haha' });
  }
};

const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await userModel.deleteUser(user_id);
    if (result === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: `User ${user_id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  deleteUser,
  getAllUsers
};