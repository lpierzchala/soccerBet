const mongoose = require('mongoose');

const { Schema } = mongoose;

const TypesSchema = new Schema({
  matchId: { type: Schema.ObjectId, ref: 'Match' },
  userId: { type: Schema.ObjectId, ref: 'User' },
  typedResult: String
});

module.exports = mongoose.model('Types', TypesSchema);
