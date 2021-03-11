const mongoose = require("mongoose");
const { Schema } = mongoose;
const TeamSchema = require('./Team')

const userSchema = new Schema({
  googleID: String,
  teams: [TeamSchema]
});

mongoose.model("users", userSchema);
