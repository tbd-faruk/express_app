const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  address: { type: String },
  dob: { type: String },
  zipcode: { type: String,default: null},
  state: { type: String,default: null},
  status: { type: String, default:1 },
});

module.exports = mongoose.model("customer", userSchema);