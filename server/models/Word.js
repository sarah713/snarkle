const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: String,
  definition: String,
});

const WordModel = mongoose.model("wordbank", WordSchema);

module.exports = WordModel;
