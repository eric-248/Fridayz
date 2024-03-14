const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  comments: {
    type: [String],
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  beans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bean",
    default: [],
  }],
  toBePosted: {
    type: Date,
  },
  username: {
    type: String,
    required: true,
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
