//const mongoose = require("mongoose");
import mongoose from "mongoose";

const BeanObject = mongoose.model(
  "BeanObject",
  new mongoose.Schema({
    thought: {
      type: String,
    },
    time: {
      type: Date,
    },
  })
);

export default BeanObject;

//module.exports = BeanObject;
