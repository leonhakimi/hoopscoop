const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  //name: String,
  players: [{label: String, value: Number}]
});

mongoose.model('Team', teamSchema)
module.exports = teamSchema;
