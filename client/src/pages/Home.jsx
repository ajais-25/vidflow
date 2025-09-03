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
    getAllVideos(true); // Ensure videos are fetched initially
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative pt-20 pb-8 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              {isSearchResults
                ? "Search Results"
                : "Entertainment Without Limits"}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              {isSearchResults
                ? "Here are the videos matching your search"
                : "Explore thousands of videos from creators around the world"}
            </p>
          </div>

          {/* Search Bar with enhanced styling */}
          <div className="max-w-2xl mx-auto mb-8 px-4 sm:px-0">
            <SearchBar onSearchResults={handleSearchResults} />
          </div>

          {/* Back to All Videos Button */}
          {isSearchResults && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleBackToAllVideos}
                className="group flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to All Videos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Videos Section */}
      <div className="px-4 sm:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {!isSearchResults && videos.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Latest Videos
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-700"></div>
              </div>
            </div>
          )}

          <InfiniteScroll
            dataLength={videos.length}
            next={getAllVideos}
            hasMore={hasMore}
            scrollThreshold={1}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Loading more videos...</span>
                </div>
              </div>
            }
          >
            <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-6">
              {videos && videos.length > 0
                ? videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                  ))
                : !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-4">
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
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {isSearchResults
                          ? "No videos found"
                          : "No videos available"}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                        {isSearchResults
                          ? "Try adjusting your search terms or browse all videos instead."
                          : "Check back later for new content or try uploading your own videos."}
                      </p>
                    </div>
                  )}
              {loading && <VideoLoader />}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Home;
