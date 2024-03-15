// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const { authenticate } = require("../middleware/authMiddleware");
const { validatePost } = require("../middleware/validationMiddleware");

// Create a new post (requires authentication)
router.post("/", authenticate, validatePost, PostController.createPost);

// Get all posts
router.get("/", PostController.getAllPosts);

// Get post by ID
router.get("/:postId", PostController.getPostById);

//ADDED get post by username
router.get("/user/:username", PostController.getPostByUserName);

// Add a bean to a post (requires authentication)
router.post("/:postId/beans", authenticate, PostController.addBean);

// Add a comment to a post (requires authentication)
router.post("/:postId/comments", authenticate, PostController.addComment);

// Like a post (requires authentication)
router.post("/:postId/like", authenticate, PostController.likePost);

// Unlike a post (requires authentication)
router.delete("/:postId/unlike", authenticate, PostController.unlikePost);

module.exports = router;
