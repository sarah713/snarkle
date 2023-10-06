const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
