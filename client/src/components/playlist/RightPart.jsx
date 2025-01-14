import React, { useState } from "react";
import PlaylistVideo from "./PlaylistVideo";

const RightPart = ({ videos }) => {
  return (
    <div className="flex-1 p-2 m-4 lg:ml-96 rounded-lg">
      {videos && videos.length === 0 && (
        <h1 className="text-2xl text-center">No videos in this playlist</h1>
      )}
      {videos &&
        videos.map((video) => <PlaylistVideo key={video?._id} video={video} />)}
    </div>
  );
};

export default RightPart;
