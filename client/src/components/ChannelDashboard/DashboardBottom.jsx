import React from "react";
import VideoCard from "../VideoCard";
import Playlist from "../playlist/Playlist";

const DashboardBottom = ({ tabSelected }) => {
  return (
    <div className="p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tabSelected === "videos" ? (
        <VideoCard isChannelDashboard={true} />
      ) : (
        <Playlist title="Playlist 1" />
      )}
    </div>
  );
};

export default DashboardBottom;
