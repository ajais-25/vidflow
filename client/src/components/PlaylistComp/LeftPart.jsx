import React from "react";

const LeftPart = ({ playlistInfo }) => {
  const thumbnail = playlistInfo?.videos?.[0]?.thumbnail || "";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 h-fit lg:sticky lg:top-24">
      {/* Thumbnail */}
      <div className="relative mb-4 sm:mb-6 group">
        <div className="h-48 sm:h-56 w-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Playlist thumbnail"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Playlist Info */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight break-words">
            {playlistInfo?.name}
          </h1>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base truncate">
              {playlistInfo?.owner?.fullName}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {playlistInfo?.videos?.length || 0} videos
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="truncate">
              Updated {new Date(playlistInfo?.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {playlistInfo?.description && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed break-words">
              {playlistInfo?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPart;
