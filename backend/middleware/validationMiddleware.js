// middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

function validateUser(req, res, next) {
  // Validate user registration/login requests
  const schema = {
    username: body('username').trim().notEmpty().withMessage('Username is required'),
    email: body('email').trim().isEmail().withMessage('Invalid email'),
    password: body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  };

  validateRequest(req, res, next, schema);
}

function validatePost(req, res, next) {
  // Validate post creation requests
  const schema = {
    comments: body('comments').optional(),
    likes: body('likes').optional(),
    beans: body('beans').optional(),
    toBePosted: body('toBePosted').optional(),
    username: body('username').trim().notEmpty().withMessage('Username is required')
  };

  validateRequest(req, res, next, schema);
}

function validateBean(req, res, next) {
  // Validate bean creation requests
  const schema = {
    thought: body('thought').trim().notEmpty().withMessage('Thought is required'),
    time: body('time').optional()
  };

  validateRequest(req, res, next, schema);
}

function validateRequest(req, res, next, schema) {
  // Run validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If no validation errors, proceed to next middleware/controller
  next();
}

module.exports = { validateUser, validatePost, validateBean };
