const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: { type: String},
  contact: { type: Number},
  address: { type: String },
  quantity: { type: String },
  description: { type: String }
});

module.exports = new mongoose.model("Post", postSchema);
