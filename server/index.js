const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");
const Score = require("./models/Score");

const WordModel = require("./models/Word");
// Connect to MongoDB

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//Route to record scores
app.post("/recordScore", async (req, res) => {
  try {
    const { username, score, date } = req.body;
    const newScore = new Score({ username, score, date });

    await newScore.save();
    res.json({ message: "Score recorded!!" });
  } catch (err) {
    console.log(err);
  }
});

// Route to retrieve scores
app.get("/getScores", async (req, res) => {
  try {
    const { username } = req.query;

    const scores = await Score.find({ username: username }).limit(14);
    console.log(scores.length);
    res.json(scores);
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
