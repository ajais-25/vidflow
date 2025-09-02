import React from "react";
import { Link } from "react-router-dom";
import { getTimeDifference } from "../utils";

function getViews(views) {
  if (views < 1000) {
    return views;
  } else if (views < 1000000) {
    return `${(views / 1000).toFixed(1)}K`.replace(".0", "");
  } else {
    return `${(views / 1000000).toFixed(1)}M`.replace(".0", "");
  }
}

const VideoCard = ({ isChannelDashboard = false, video }) => {
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
    <Link to={`/watch/${video?._id}`} className="block w-full group">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden">
        {/* Thumbnail Container */}
        <div className="relative h-48 sm:h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
          <img
            src={video?.thumbnail}
            alt="Thumbnail"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
            {formattedDuration}
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            {!isChannelDashboard && (
              <Link
                to={`/c/${video?.owner.username}`}
                className="flex-shrink-0 w-11 h-11 rounded-full ring-2 ring-blue-100 dark:ring-blue-800 hover:ring-blue-200 dark:hover:ring-blue-700 transition-all duration-300 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={video?.owner.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </Link>
            )}

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h2
                className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                title={video?.title || "Video Title"}
              >
                {video?.title || "Video Title"}
              </h2>

              {/* Channel Name */}
              {!isChannelDashboard ? (
                <Link
                  to={`/c/${video?.owner.username}`}
                  className="inline-block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-1 transition-colors duration-300 truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  {video?.owner.fullName}
                </Link>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1 truncate">
                  {video?.owner.fullName}
                </p>
              )}

              {/* Views and Time */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
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
                  {views} views
                </span>
                <span className="mx-2">•</span>
                <span>{timeDifference}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
