import React, { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

const Keyboard = () => {
  const {
    handleSelectLetter,
    handleSelectEnter,
    handleSelectDel,
    disabledKey,
  } = useContext(AppContext);
  const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      handleSelectEnter();
    } else if (event.key == "Backspace") {
      handleSelectDel();
    } else {
      let keyFound = false;
      keyboardLayout.forEach((row) => {
        row.forEach((key) => {
          if (keyFound) return;
          if (event.key.toLowerCase() === key.toLowerCase()) {
            if (key !== "ENTER" && key !== "DEL") {
              handleSelectLetter(key);
              keyFound = true;
            }
          }
        });
      });
    }
  });

  // Detect Keyboard events
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);
  return (
    <div className="p-4" onKeyDown={handleKeyboard}>
      {keyboardLayout.map((row, rowIdx) => (
        <div className="flex justify-center space-x-2 py-1" key={rowIdx}>
          {row.map((key, keyIdx) => (
            <Key
              keyVal={key}
              rowidx={rowIdx}
              disabled={disabledKey.includes(key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
