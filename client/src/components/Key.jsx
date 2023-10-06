import React, { useContext } from "react";
import { AppContext } from "../App";
import "../App.css";
const Key = ({ keyVal, disabled }) => {
  const { handleSelectDel, handleSelectEnter, handleSelectLetter } =
    useContext(AppContext);

  // Handle key click
  const selectLetter = () => {
    // if (currAttempt.attempt == 2) {
    //     // alert to use the hint
    // }
    //   If the key pressed is ENTER
    if (keyVal === "ENTER") {
      handleSelectEnter();
    }
    // If the key pressed is Delete
    else if (keyVal === "DEL") {
      handleSelectDel();
    } else {
      handleSelectLetter(keyVal);
    }
  };

  return (
    <button
      className="bg-neutral border border-neutral hover:border-secondary-focus text-white font-semibold py-2 px-4 rounded-md"
      onClick={selectLetter}
      id={disabled ? "disabled" : ""}
    >
      {keyVal}
    </button>
  );
};

export default Key;
