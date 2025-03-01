import React from "react";
import VideoCard from "../VideoCard";
import Playlist from "../PlaylistComp/Playlist";

const DashboardBottom = ({ tabSelected, channelVideos, channelPlaylists }) => {
  return (
    <div className="p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-4">
      {tabSelected === "videos" ? (
        <>
          {channelVideos && channelVideos.length === 0 && (
            <div className="col-span-4 w-full text-center text-lg text-gray-500 dark:text-gray-400">
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
            <div className="col-span-4 w-full text-center text-lg text-gray-500 dark:text-gray-400">
              No playlists found
            </div>
          )}
          {channelPlaylists &&
            channelPlaylists.map((playlist) => (
              <Playlist key={playlist._id} playlist={playlist} />
            ))}
        </>
      )}
    </div>
  );
};

export default DashboardBottom;
