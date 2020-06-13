const mongoose = require("mongoose");

const AdditionSchema = new mongoose.Schema({
  username: String,
  score: Number,
  date: Date,
  slug: String,
});

module.exports = mongoose.model("Addition", AdditionSchema);
