//const mongoose = require("mongoose");
import mongoose from "mongoose";

const UserObject = mongoose.model(
  "UserObject",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    friends: {
      type: [String],
      default: [],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "no bio",
    },
  })
);

export default UserObject;
//module.exports = UserObject;
