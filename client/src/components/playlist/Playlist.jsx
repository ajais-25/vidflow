// src/components/PlaylistTitle.jsx
import React from "react";

const Playlist = ({ title }) => {
  return (
    <div className="flex flex-col active:scale-95 md:hover:scale-105 transition-all duration-300 cursor-pointer items-center">
      {/* Adjust size of the container */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md"></div>
      <p className="mt-2 text-lg text-gray-800 dark:text-gray-300">{title}</p>
    </div>
  );
};

export default Playlist;
