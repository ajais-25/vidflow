import React from "react";

function getTimeDifference(updatedTime) {
  const currentTime = new Date();
  const updatedDate = new Date(updatedTime);

  const diffInMilliseconds = currentTime - updatedDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Approximate number of days in a month
  const years = Math.floor(days / 365.25); // Approximate number of days in a year

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

const VideoCard = ({ isChannelDashboard = false, video }) => {
  const duration = (video?.duration).toFixed();
  const seconds = duration % 60;
  const minutes = (duration - seconds) / 60;
  const hours = minutes / 60;
  const formattedDuration = `${hours ? `${hours}:` : ""}${
    minutes < 10 && hours ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  const timeDifference = getTimeDifference(video?.createdAt);

  return (
    <div className="p-4 w-full">
      <div className="bg-white md:hover:scale-105 active:scale-95 transition-all duration-300 dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer">
        <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4 relative">
          <img
            src={video?.thumbnail}
            alt="Thumbnail"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
            {formattedDuration}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {!isChannelDashboard && (
            <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full">
              <img
                src={video?.owner.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {video?.title || "Video Title"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {video?.owner.fullName}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {video?.views} views • {timeDifference}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
