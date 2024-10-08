import React from "react";
import LeftPart from "../components/playlist/LeftPart";
import RightPart from "../components/playlist/RightPart";

const PlaylistIndividual = () => {
  return (
    <div className="min-h-screen bg-blue-400 dark:bg-gray-900 px-4 py-20 text-gray-900 relative dark:text-gray-100">
      <div className="flex sm:flex-col">
        <LeftPart />
        <RightPart />
      </div>
    </div>
  );
};

export default PlaylistIndividual;
