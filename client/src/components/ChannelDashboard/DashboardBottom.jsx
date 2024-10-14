import React from "react";
import VideoCard from "../VideoCard";
import Playlist from "../playlist/Playlist";

const DashboardBottom = ({ tabSelected }) => {
  return (
    <div className="p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tabSelected === "videos" ? (
        <>
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
        </>
      ) : (
        <>
          <Playlist title="Playlist 1" />
          <Playlist title="Playlist 2" />
          <Playlist title="Playlist 3" />
          <Playlist title="Playlist 4" />
          <Playlist title="Playlist 5" />
          <Playlist title="Playlist 6" />
        </>
      )}
    </div>
  );
};

export default DashboardBottom;
