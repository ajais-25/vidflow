import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { API } from "../api";

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserWatchHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API}/users/history`);
      setWatchHistory(response.data.data || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load watch history. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete(`${API}/users/history/clear`);
      setWatchHistory([]);
    } catch (error) {
      console.error(error);
      setError("Failed to clear watch history. Please try again.");
    }
  };

  useEffect(() => {
    getUserWatchHistory();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-48 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-6">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="aspect-video bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Watch History
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Keep track of videos you've watched recently
                </p>
              </div>

              {watchHistory.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {watchHistory.length} video
                    {watchHistory.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={clearHistory}
                    className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 flex items-center space-x-2 font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Clear History</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-red-800 dark:text-red-200 font-medium">
                    Error loading history
                  </h3>
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
                <button
                  onClick={getUserWatchHistory}
                  className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!error && watchHistory.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 max-w-md mx-auto">
                <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  No Watch History Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Start watching videos to build your history. Your recently
                  watched videos will appear here.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explore Videos
                </button>
              </div>
            </div>
          )}

          {/* Videos Grid */}
          {!error && watchHistory.length > 0 && (
            <div className="space-y-6">
              {/* Grid Container */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-6">
                {watchHistory.map((video, index) => (
                  <div
                    key={video._id}
                    className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInUp 0.5s ease-out forwards",
                    }}
                  >
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default WatchHistory;
