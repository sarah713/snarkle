import axios from "axios";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import words from "./data.json";
import calculateScore from "./utils/CalculateScore";
import generateUsername from "./utils/GenerateUsername";
import { boardDefault } from "./utils/Words";

export const AppContext = createContext();
function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [curWord, setCurWord] = useState({ word: "", definition: "" });
  const [disabledKey, setDisabledKey] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  axios.defaults.withCredentials = true;
  // username generation
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const newUserName = generateUsername();
      localStorage.setItem("username", newUserName);
      setUsername(newUserName);
    }
  }, []);

  // Fetches a random word
  useEffect(() => {
    const fetchRandomWord = () => {
      const randomIdx = Math.floor(Math.random() * words.length);
      return words[randomIdx];
    };
    setCurWord(fetchRandomWord());
  }, []);

  const word = curWord.word.toUpperCase();
  const definition = curWord.definition;

  const handleSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) {
      return;
      //   evaluate(board, currAttempt.attempt);
    }
    const newBoard = [...board];

    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;

    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letterPos: currAttempt.letterPos + 1,
    });
  };

  const handleSelectEnter = () => {
    if (currAttempt.letterPos !== 5) {
      return;
    }
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    setCurrAttempt({
      attempt: currAttempt.attempt + 1,
      letterPos: 0,
    });

    if (currWord === word) {
      setGameOver({ gameOver: true, guessedWord: true });
      setScore(calculateScore(currAttempt.attempt, gameOver.guessedWord));
      return;
    }
    if (currAttempt.attempt === 4) {
      console.log(gameOver.guessedWord);
      setGameOver({ gameOver: true, guessedWord: false });
      setScore(calculateScore(currAttempt.attempt, gameOver.guessedWord));

      return;
    }
  };

  const handleSelectDel = () => {
    if (currAttempt.letterPos === 0) return;
    // else
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos - 1,
    });
  };

  const submitScore = async (score) => {
    const currDate = new Date();
    const data = {
      username: username,
      score: score,
    };
    await axios
      .post("https://snarkle-server.vercel.app/recordScore", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // Fetch scores
  const handleFetchScores = async () => {
    try {
      const response = await axios.get(
        `https://snarkle-server.vercel.app?username=${username}`
      );
      const fetchedScores = response.data;
      setScores(fetchedScores);
      setIsModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClose = (e) => {
    if (e.target.id) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="text-center text-primary w-100 h-100 grid-flow-col">
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          handleSelectLetter,
          handleSelectEnter,
          handleSelectDel,
          word,
          definition,
          disabledKey,
          setDisabledKey,
          gameOver,
          setGameOver,
          submitScore,
          username,
          score,
          scores,
          isModalOpen,
          handleFetchScores,
          handleOnClose,
        }}
      >
        <Navbar />
        <div className="flex justify-center flex-col items-center">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}

          {isModalOpen && <Modal />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
