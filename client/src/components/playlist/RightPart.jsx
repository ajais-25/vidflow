import React from "react";
import PlaylistVideo from "./PlaylistVideo";

const videoData = [
  {
    title: "Introduction to DBMS Placements Course 2022",
    views: "868K views",
    time: "2 years ago",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "What is DBMS?",
    views: "573K views",
    time: "2 years ago",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "Introduction to DBMS Placements Course 2022",
    views: "868K views",
    time: "2 years ago",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "What is DBMS?",
    views: "573K views",
    time: "2 years ago",
    thumbnail: "https://via.placeholder.com/150",
  },
];

const RightPart = () => {
  return (
    <div className="flex-1 p-2 m-4 lg:ml-96 rounded-lg">
      {videoData.map((video, index) => (
        <PlaylistVideo key={index} video={video} />
      ))}
    </div>
  );
};

export default RightPart;
