import React from "react";
import VideoCard from "../VideoCard";
import Playlist from "../playlist/Playlist";

const DashboardBottom = ({ tabSelected, channelVideos, channelPlaylists }) => {
  return (
    <div className="p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tabSelected === "videos" ? (
        <>
          {channelVideos && channelVideos.length === 0 && (
            <div className="col-span-4 text-center text-lg text-gray-500 dark:text-gray-400">
              No videos found
            </div>
          )}
          {channelVideos &&
            channelVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                isChannelDashboard={true}
              />
            ))}
        </>
      ) : (
        <>
          {channelPlaylists && channelPlaylists.length === 0 && (
            <div className="col-span-4 text-center text-lg text-gray-500 dark:text-gray-400">
              No playlists found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardBottom;
