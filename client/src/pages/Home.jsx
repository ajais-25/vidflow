import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { API } from "../api";
import VideoLoader from "../components/Loader/VideoLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchResults, setIsSearchResults] = useState(false);

  const getAllVideos = async (reset = false) => {
    if (reset) {
      setVideos([]);
      setPage(1);
      setHasMore(true);
    }
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${API}/videos?page=${reset ? 1 : page}`
        );
        const newVideos = response.data.data;
        setVideos((prev) => (reset ? newVideos : [...prev, ...newVideos]));
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

  const handleSearchResults = (results) => {
    setVideos(results);
    setIsSearchResults(true);
    setHasMore(false); // Disable infinite scroll for search results
  };

  const handleBackToAllVideos = () => {
    setIsSearchResults(false);
    getAllVideos(true); // Reset and fetch all videos
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-10 dark:bg-gray-900 dark:text-white">
      <SearchBar onSearchResults={handleSearchResults} />
      {isSearchResults && (
        <div className="flex justify-between items-center mb-4 mt-8">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          <button
            onClick={handleBackToAllVideos}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to All Videos
          </button>
        </div>
      )}
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
