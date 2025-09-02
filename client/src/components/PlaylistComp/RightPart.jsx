import React from "react";
import PlaylistVideo from "./PlaylistVideo";

const RightPart = ({ videos }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full flex-shrink-0"></div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white leading-tight">
          Videos in this Playlist
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-700"></div>
      </div>

      {/* Videos List */}
      {videos && videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg mx-2 sm:mx-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center px-4">
            No videos in this playlist
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center max-w-md px-4">
            This playlist is currently empty. Videos will appear here when they
            are added to the playlist.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {videos &&
            videos.map((video, index) => (
              <div key={video?._id} className="group">
                <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 px-1">
                  <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="truncate">
                    Video {index + 1} of {videos.length}
                  </span>
                </div>
                <PlaylistVideo video={video} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RightPart;
