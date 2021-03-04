const mongoose = require('mongoose');

const { Schema } = mongoose;

const MatchSchema = new Schema({
  homeTeam: String,
  awayTeam: String,
  result: String
});

module.exports = mongoose.model('Match', MatchSchema);
