const mongoose = require('mongoose');

const beanSchema = new mongoose.Schema({
  thought: {
    type: String,
  },
  time: {
    type: Date,
  },
});

const Bean = mongoose.model('Bean', beanSchema);

module.exports = Bean;
