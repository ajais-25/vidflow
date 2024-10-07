import React from "react";
import LeftPart from "../components/playlist/LeftPart";
import RightPart from "../components/playlist/RightPart";

const PlaylistIndividual = () => {
  return (
    <div className="h-full dark:bg-gray-900 px-20 py-20 text-gray-900 relative dark:text-gray-100">
      <div className="flex flex-col md:flex-row">
        <LeftPart />
        <RightPart />
      </div>
    </div>
  );
};

export default PlaylistIndividual;
