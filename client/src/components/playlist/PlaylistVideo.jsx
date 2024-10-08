import React from "react";

const PlaylistVideo = ({ video }) => {
  return (
    <div className="flex items-center gap-6 px-6 py-6 mb-2 cursor-pointer transition-all duration-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
      <div className="h-36 w-64 rounded-lg bg-gray-400 relative shrink-0">
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
          12:34
        </div>
      </div>
      <div className="self-start w-full">
        <h2 className="font-semibold text-lg">{video.title}</h2>
        <p className="text-sm mt-3 text-gray-500">Akshat Jaiswal</p>
        <p className="text-sm mt-1 text-gray-500">
          {video.views} • {video.time}
        </p>
      </div>
    </div>
  );
};

export default PlaylistVideo;
