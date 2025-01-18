import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { API } from "../api";

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [message, setMessage] = useState("Loading...");

  const getLikedVideos = async () => {
    try {
      const response = await axios.get(`${API}/likes/videos`);
      //   console.log(response.data.data);
      setLikedVideos(response.data.data);
      setMessage("No videos found.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <div className="container mx-auto py-24 px-4 sm:px-10">
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 px-4">
        Liked Videos
      </p>
      {likedVideos.length === 0 && (
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 px-4">
          {message}
        </p>
      )}
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {likedVideos &&
          likedVideos.map((video) => (
            <VideoCard key={video._id} video={video.video} />
          ))}
      </div>
    </div>
  );
};

export default LikedVideos;
