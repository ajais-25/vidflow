// src/components/VideoCard.jsx
import React from "react";

const VideoCard = () => {
  return (
    <div className="p-4 w-full">
      <div className="bg-white hover:scale-105 transition-all dark:bg-gray-800 rounded-lg shadow-sm p-4 cursor-pointer">
        <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4 relative">
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
            12:34
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              This is a video
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Akshat Jaiswal</p>
            <p className="text-gray-500 dark:text-gray-400">
              100K views • 1 hour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
