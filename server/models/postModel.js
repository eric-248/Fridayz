//const mongoose = require("mongoose");
import mongoose from "mongoose";

const PostObject = mongoose.model(
  "PostObject",
  new mongoose.Schema({
    comments: {
      type: [String],
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    thoughts: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "BeanObject" }],
      default: [],
    },
    toBePosted: {
      type: Date,
    },
    username: {
      type: String,
      required: true,
    },
  })
);

export default PostObject;
//module.exports = PostObject;
