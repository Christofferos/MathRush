const mongoose = require("mongoose");
const slugify = require("slugify");

const SubtractionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: Date,
  slug: String,
});

// Create slug from the username
SubtractionSchema.pre("save", function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});

module.exports = mongoose.model("Subtraction", SubtractionSchema);
