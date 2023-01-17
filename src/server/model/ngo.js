const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  organization_name: { type: String, default: null },
  contact: { type: Number, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  role:{ type: String, default: null },
  token: { type: String }
});

module.exports = new mongoose.model("Ngo", ngoSchema);
