const mongoose = require("mongoose");

const loseWeightSchema = new mongoose.Schema({
  start_weight:{ type: String, default: null},
  goal_weight:{ type: String, default: null},
  start_body_fat:{ type: String, default: null},
  goal_body_fat:{ type: String, default: null}
});

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, default: null },
  address: { type: String },
  dob: { type: String },
  zipcode: { type: String,default: null},
  state: { type: String,default: null},
  lose_weight:{
    start_weight:{ type: String, default: null},
    goal_weight:{ type: String, default: null},
    start_body_fat:{ type: String, default: null},
    goal_body_fat:{ type: String, default: null}
  },
  body_recomp: {
    start_rocamp:{ type: String, default: null},
    goal_rocamp:{ type: String, default: null},
    start_rocamp_fat:{ type: String, default: null},
    goal_rocamp_fat:{ type: String, default: null}
  },
  gain_muscle: {
    start_muscle:{ type: String, default: null},
    goal_muscle:{ type: String, default: null},
    start_muscle_fat:{ type: String, default: null},
    goal_muscle_fat:{ type: String, default: null}
  },
  status: { type: String, default:1 },
});

module.exports = mongoose.model("customer", userSchema);