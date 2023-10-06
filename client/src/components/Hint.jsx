import React, { useContext } from "react";
import { AppContext } from "../App";

const Hint = () => {
  const { definition } = useContext(AppContext);
  return (
    <div className="flex justify-center items-center mt-1">
      <div className=" p-2 text-center text-white">
        <span className="italic text-secondary ">Hint</span> :{" "}
        <span className="text-white font-semibold">{definition}</span>
      </div>
    </div>
  );
};

export default Hint;
