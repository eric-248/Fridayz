// controllers/postController.js
const Post = require("../models/post");

function getNextFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = 5 - dayOfWeek + (dayOfWeek >= 5 ? 7 : 0); // If today is Friday or later, add 7 days to get to the next Friday
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  nextFriday.setHours(21, 0, 0, 0);
  return nextFriday;
}

function getPreviousFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceFriday = dayOfWeek - 5 + (dayOfWeek < 5 ? 7 : 0); // If today is Friday or earlier, add 7 days to get to the previous Friday
  const previousFriday = new Date(today);
  previousFriday.setDate(today.getDate() - daysSinceFriday);
  previousFriday.setHours(21, 0, 0, 0);
  return previousFriday;
}

const PostController = {
  createPost: async (req, res) => {
    try {
      let { comments, likes, beans, toBePosted, username } = req.body;
      //ADDED
      toBePosted = getNextFriday();
      // Create a new post
      const newPost = new Post({
        comments,
        likes,
        beans,
        toBePosted,
        username,
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
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //ADDED get post by username and dateToPost
  getPostByUserName: async (req, res) => {
    try {
      const username = req.params.username;
      console.log(username);
      let prevDate = getNextFriday();
      // Find the post by ID
      const post = await Post.findOne({
        username: username,
        toBePosted: prevDate,
      });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
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
        return res.status(404).json({ message: "Post not found" });
      }

      post.comments.push(comment);
      await post.save();

      res.json({ message: "Comment added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //ADD add bean to post
  addBean: async (req, res) => {
    try {
      const postId = req.params.postId;
      const { beanId } = req.body;

      // Find the post by ID and add the comment to its comments array
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.beans.push(beanId);

      console.log("ere", post.beans);

      await post.save();

      res.json({ message: "Bean added successfully" });
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
        return res.status(404).json({ message: "Post not found" });
      }

      post.likes++;
      await post.save();

      res.json({ message: "Post liked successfully" });
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
        return res.status(404).json({ message: "Post not found" });
      }

      post.likes--;
      await post.save();

      res.json({ message: "Post unliked successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PostController;
