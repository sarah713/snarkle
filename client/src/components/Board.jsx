import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import "../App.css";
import Hint from "./Hint";
import Letter from "./Letter";
const Board = () => {
  const { board, currAttempt, gameOver } = useContext(AppContext);
  const [showHint, setShowHint] = useState(false);
  const setHint = () => {
    setShowHint(true);
    const button = document.getElementById("display");
    button.classList.add("remove");
  };
  return (
    <div className=" p-1">
      {/* rowIdx is the attempt value */}
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center">
          {/* cellIdx is the letter position */}
          {row.map((cell, cellIdx) => (
            <Letter letterPos={cellIdx} attemptVal={rowIdx} cell />
          ))}
        </div>
      ))}

      {currAttempt.attempt === 3 && !gameOver.guessedWord && (
        <button
          onClick={setHint}
          className="rounded-full bg-accent text-white font-sans px-3 py-1 mt-2"
          id="display"
        >
          Show hint
        </button>
      )}
      {showHint && !gameOver.guessedWord && !gameOver.gameOver ? (
        <Hint />
      ) : null}
    </div>
  );
};

export default Board;
