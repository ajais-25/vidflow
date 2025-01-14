import React from "react";
import { Link } from "react-router-dom";
import { getTimeDifference } from "../utils";

function getViews(views) {
  if (views < 1000) {
    return views;
  } else if (views < 1000000) {
    return `${(views / 1000).toFixed(1)}K`;
  } else {
    return `${(views / 1000000).toFixed(1)}M`;
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
    <Link to={`/watch/${video?._id}`} className="p-4 w-full">
      <div className="bg-white md:hover:scale-105 active:scale-95 transition-all duration-300 dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer">
        <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4 relative">
          <img
            src={video?.thumbnail}
            alt="Thumbnail"
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
            {formattedDuration}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!isChannelDashboard && (
            <Link
              to={`/c/${video?.owner.username}`}
              className="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full"
            >
              <img
                src={video?.owner.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {video?.title || "Video Title"}
            </h2>
            {!isChannelDashboard ? (
              <Link
                to={`/c/${video?.owner.username}`}
                className="text-gray-500 dark:text-gray-400 hover:underline"
              >
                {video?.owner.fullName}
              </Link>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {video?.owner.fullName}
              </p>
            )}
            <p className="text-gray-500 dark:text-gray-400">
              {views} views • {timeDifference}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
