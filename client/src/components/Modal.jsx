import React, { useContext } from "react";
import { AppContext } from "../App";

const Modal = () => {
  const { username, scores, handleOnClose } = useContext(AppContext);

  const uniqueDates = new Set();

  // Filter the scores array to keep only unique dates
  const uniqueScores = scores.filter((score) => {
    const date = new Date(score.createdAt).toLocaleString().split(",")[1];
    if (!uniqueDates.has(date)) {
      uniqueDates.add(date);
      return true;
    }
    return false;
  });

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >
      <div className="bg-neutral p-6 shadow-lg">
        <h2 className="text-2xl font-semibold font-mono mb-4">
          {username}'s scores
        </h2>
        {scores.length === 0 ? (
          <h2>How bout you play the game first?</h2>
        ) : (
          <ul>
            {uniqueScores.map((score) => (
              <li
                key={score._id}
                className="flex justify-between items-center py-2 border-b border-base-100"
              >
                <span className="text-white">
                  {" "}
                  {new Date(score.createdAt).toLocaleString().split(",")},{" "}
                </span>
                <span className="text-secondary font-semibold">
                  Score : {score.score}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Modal;
