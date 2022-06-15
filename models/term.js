const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  description: { type: String},
  status: { type: String, default:1 },
});

module.exports = mongoose.model("term", termSchema);