const mongoose = require("mongoose");
const slugify = require("slugify");

const AdditionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: Date,
  slug: String,
});

// Create addition slug from the username
AdditionSchema.pre("save", function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});

module.exports = mongoose.model("Addition", AdditionSchema);
