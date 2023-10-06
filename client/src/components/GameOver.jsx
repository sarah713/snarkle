import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, word, currAttempt, submitScore, score } =
    useContext(AppContext);
  useEffect(() => {
    submitScore(score);
  }, [gameOver.gameOver]);
  return (
    <div className="p-4 flex justify-center items-center bg-neutral border border-accent w-auto rounded-lg mt-4 text-xl font-mono">
      <div className="flex-col text-white ">
        <h3>
          {gameOver.guessedWord
            ? "You're snarky!"
            : "You Failed to Guess the Word"}
        </h3>
        {!gameOver.guessedWord && <h3>Correct word : {word}</h3>}
        {gameOver.guessedWord && (
          <h3>Slayed in {currAttempt.attempt} attempts and how!!!</h3>
        )}
      </div>
    </div>
  );
};

export default GameOver;
