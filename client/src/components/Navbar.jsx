import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AppContext } from "../App";
const Navbar = () => {
  const { handleFetchScores } = useContext(AppContext);
  return (
    <nav className="navbar mb-6 shadow-lg bg-inherit ">
      <div className="flex  justify-center items-center mx-auto  font-bold font-serif text-white tracking-tighter text-2xl">
        SNARKLE
      </div>
      <button
        className="flex justify-center mx-3 text-white"
        onClick={handleFetchScores}
      >
        <FontAwesomeIcon icon={faChartBar} size="2x" />
      </button>
    </nav>
  );
};

export default Navbar;
