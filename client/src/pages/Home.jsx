import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { API } from "../api";
import VideoLoader from "../components/Loader/VideoLoader";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(`${API}/videos`);
        // console.log(response.data.data);
        setVideos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos: ", error);
        setLoading(false);
      }
    };

    getAllVideos();
  }, []);

  return (
    <div className="min-h-screen py-24 px-4 sm:px-10">
      {/* Responsive grid layout */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-4">
        {loading && <VideoLoader />}
        {
          // Display all the videos
          videos &&
            videos.map((video) => <VideoCard key={video._id} video={video} />)
        }
      </div>
    </div>
  );
};

export default Home;
