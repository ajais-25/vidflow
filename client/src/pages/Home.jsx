import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { API } from "../api";
import VideoLoader from "../components/Loader/VideoLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getAllVideos = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get(`${API}/videos?page=${page}`);
        // console.log(response.data.data);
        const newVideos = response.data.data;
        setVideos((prev) => [...prev, ...newVideos]);
        setLoading(false);
        setPage((prev) => prev + 1);
        if (newVideos.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching videos: ", error);
        setLoading(false);
      }
    }, 300);
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div className="min-h-screen py-24 px-4 sm:px-10">
      {/* Responsive grid layout */}
      <InfiniteScroll
        dataLength={videos.length}
        next={getAllVideos}
        hasMore={hasMore}
        scrollThreshold={1} // Trigger API call when 100% scrolled
      >
        <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-4">
          {
            // Display all the videos
            videos &&
              videos.map((video) => <VideoCard key={video._id} video={video} />)
          }
          {loading && <VideoLoader />}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
