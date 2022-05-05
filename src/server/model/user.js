const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  contact: { type: Number, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = new mongoose.model("user", userSchema);
