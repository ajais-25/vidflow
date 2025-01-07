import React from "react";

const Playlist = ({ playlist }) => {
  const playlistVideos = playlist?.videos;
  const image = playlistVideos?.[0]?.thumbnail;

  return (
    <div className="flex flex-col active:scale-95 md:hover:scale-105 transition-all duration-300 cursor-pointer items-center">
      {/* Adjust size of the container */}
      <div className="w-full h-44 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md relative">
        <div className="w-full h-44 bg-gray-300 dark:bg-gray-600 rounded-lg shadow-md absolute top-2"></div>
        <div className="w-full h-44 bg-gray-400 dark:bg-gray-500 rounded-lg shadow-md absolute top-4">
          <img
            src={image}
            alt=""
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
        </div>
      </div>
      <p className="mt-6 text-lg text-gray-800 dark:text-gray-300">
        {playlist && playlist?.name}
      </p>
    </div>
  );
};

export default Playlist;
