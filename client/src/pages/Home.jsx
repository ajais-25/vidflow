import React from "react";
import VideoCard from "../components/VideoCard";

const Home = () => {
  return (
    <div className="container mx-auto py-24 px-10">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
};

export default Home;
