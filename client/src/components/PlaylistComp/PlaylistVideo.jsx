import React from "react";
import { getTimeDifference } from "../../utils";
import { Link } from "react-router-dom";

function getViews(views) {
  if (views < 1000) {
    return views;
  } else if (views < 1000000) {
    return `${(views / 1000).toFixed(1)}K`;
  } else {
    return `${(views / 1000000).toFixed(1)}M`;
  }
}

const PlaylistVideo = ({ video }) => {
  const duration = video?.duration?.toFixed() || 0;
  const seconds = duration % 60;
  const minutes = (duration - seconds) / 60;
  const hours = minutes / 60;
  const formattedDuration = `${hours ? `${hours}:` : ""}${
    minutes < 10 && hours ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  const timeDifference = getTimeDifference(video?.createdAt);
  const views = getViews(video?.views);

  return (
    <Link
      to={`/watch/${video?._id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 mx-1 sm:mx-0"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-56 md:w-64 h-48 sm:h-32 md:h-36 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 shrink-0">
          <img
            src={video?.thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium backdrop-blur-sm">
            {formattedDuration}
          </div>
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex-1 space-y-2 sm:space-y-3">
          <h2
            className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 overflow-hidden leading-snug"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {video?.title}
          </h2>

          <div className="flex items-center gap-2">
            <Link
              to={`/c/${video?.owner.username}`}
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:underline truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {video?.owner.fullName}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="truncate">{views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="truncate">{timeDifference}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistVideo;
