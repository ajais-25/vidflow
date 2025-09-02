import React from "react";
import VideoCard from "../VideoCard";
import Playlist from "../PlaylistComp/Playlist";

const DashboardBottom = ({ tabSelected, channelVideos, channelPlaylists }) => {
  const isEmpty =
    tabSelected === "videos"
      ? !channelVideos || channelVideos.length === 0
      : !channelPlaylists || channelPlaylists.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-6">
          {tabSelected === "videos" ? (
            <svg
              className="w-12 h-12 text-blue-500 dark:text-blue-400"
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
          ) : (
            <svg
              className="w-12 h-12 text-emerald-500 dark:text-emerald-400"
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
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {tabSelected === "videos" ? "No Videos Yet" : "No Playlists Yet"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
          {tabSelected === "videos"
            ? "This channel hasn't uploaded any videos yet. Check back later for new content."
            : "This channel hasn't created any playlists yet. Playlists help organize videos by topic or theme."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-6">
      {tabSelected === "videos"
        ? channelVideos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              isChannelDashboard={true}
            />
          ))
        : channelPlaylists.map((playlist) => (
            <Playlist key={playlist._id} playlist={playlist} />
          ))}
    </div>
  );
};
export default DashboardBottom;
