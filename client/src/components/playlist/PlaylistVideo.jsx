import React from "react";
import { getTimeDifference } from "../../utils";
import { Link } from "react-router-dom";

const PlaylistVideo = ({ video }) => {
  const duration = video?.duration?.toFixed() || 0;
  const seconds = duration % 60;
  const minutes = (duration - seconds) / 60;
  const hours = minutes / 60;
  const formattedDuration = `${hours ? `${hours}:` : ""}${
    minutes < 10 && hours ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  const timeDifference = getTimeDifference(video?.createdAt);

  return (
    <Link
      to={`/watch/${video?._id}`}
      className="flex flex-col sm:flex-row items-center gap-6 px-6 py-6 mb-2 cursor-pointer transition-all duration-300 rounded-lg active:scale-95 shadow-md md:hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      <div className="h-36 w-full sm:self-start sm:w-64 rounded-lg bg-gray-400 relative shrink-0">
        <img
          src={video?.thumbnail}
          alt="Thumbnail"
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
          {formattedDuration}
        </div>
      </div>
      <div className="self-center sm:self-start w-full">
        <h2 className="font-semibold text-lg">{video?.title}</h2>
        <div className="flex items-center space-x-3">
          <div>
            <Link
              to={`/c/${video?.owner.username}`}
              className="text-gray-500 dark:text-gray-400 hover:underline"
            >
              {video?.owner.fullName}
            </Link>
          </div>
        </div>
        <p className="text-sm mt-1 text-gray-500">
          {video?.views} views • {timeDifference}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistVideo;
