// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateUser } = require('../middleware/validationMiddleware');

// Register a new user
router.post('/register', validateUser, UserController.register);

// Login an existing user
router.post('/login', UserController.login);

// Get user profile (requires authentication)
router.get('/profile', authenticate, UserController.getProfile);

// Update user profile (requires authentication)
router.put('/profile', authenticate, validateUser, UserController.updateProfile);

// Add a friend for the current user (requires authentication)
router.post('/add-friend/:friendId', authenticate, UserController.addFriend);

// Remove a friend for the current user (requires authentication)
router.delete('/remove-friend/:friendId', authenticate, UserController.removeFriend);

module.exports = router;
