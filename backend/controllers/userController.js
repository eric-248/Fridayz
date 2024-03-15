// controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      // Retrieve user information from the request object
      const userId = req.user.userId;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ADDED Get user profile by id
  getProfileById: async (req, res) => {
    try {
      // Retrieve user information from the request object
      const userId = req.params.userId;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // controllers/userController.js

  getUserIdByUsername: async (req, res) => {
    try {
      const username = req.params.username;

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ userId: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      // Retrieve user information from the request object
      const userId = req.user.userId;
      const { username, email, bio } = req.body;

      // Find the user by ID and update their profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, bio },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a friend for the current user
  addFriend: async (req, res) => {
    try {
      // Retrieve user information from the request object
      const userId = req.user.userId;
      const friendId = req.params.friendId;
      // Find the current user and add the friend to their friends list
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.friends.push(friendId);
      await user.save();

      res.json({ message: "Friend added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Remove a friend for the current user
  removeFriend: async (req, res) => {
    try {
      // Retrieve user information from the request object
      const userId = req.user.userId;
      const friendId = req.params.friendId;

      // Find the current user and remove the friend from their friends list
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.friends = user.friends.filter((id) => id !== friendId);
      await user.save();

      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
