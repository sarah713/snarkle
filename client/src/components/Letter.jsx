import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal, cell }) => {
  const { board, currAttempt, word, disabledKey, setDisabledKey } =
    useContext(AppContext);

  const letter = board[attemptVal][letterPos];

  const correct = word[letterPos] === letter;
  const almost = !correct && letter !== "" && word.includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");
  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledKey((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div
      className="w-12 h-12 m-0.5 border border-primary flex items-center justify-center text-lg font-semibold rounded-sm text-white"
      id={letterState}
    >
      {letter}
    </div>
  );
};

export default Letter;
