// controllers/postController.js
const Post = require('../models/post');

const PostController = {
  createPost: async (req, res) => {
    try {
      const { comments, likes, beans, toBePosted, username } = req.body;

      // Create a new post
      const newPost = new Post({
        comments,
        likes,
        beans,
        toBePosted,
        username
      });
      await newPost.save();

      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get post by ID
  getPostById: async (req, res) => {
    try {
      const postId = req.params.postId;

      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a comment to a post
  addComment: async (req, res) => {
    try {
      const postId = req.params.postId;
      const { comment } = req.body;

      // Find the post by ID and add the comment to its comments array
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.comments.push(comment);
      await post.save();

      res.json({ message: 'Comment added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Like a post
  likePost: async (req, res) => {
    try {
      const postId = req.params.postId;

      // Find the post by ID and increment the likes count
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.likes++;
      await post.save();

      res.json({ message: 'Post liked successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Unlike a post
  unlikePost: async (req, res) => {
    try {
      const postId = req.params.postId;

      // Find the post by ID and decrement the likes count
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.likes--;
      await post.save();

      res.json({ message: 'Post unliked successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PostController;