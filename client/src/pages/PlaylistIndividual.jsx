import React, { useEffect, useState } from "react";
import LeftPart from "../components/PlaylistComp/LeftPart";
import RightPart from "../components/PlaylistComp/RightPart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

const PlaylistIndividual = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPlaylist = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/playlist/${playlistId}`);
      setPlaylist(response.data.data);
      setVideos(response.data.data.videos);
    } catch (error) {
      console.error(error);
      setError("Failed to load playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [playlistId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Loading Playlist
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we fetch your playlist...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-12 h-12 text-red-500 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={getPlaylist}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-normal pb-2 px-2">
              {playlist?.name || "Playlist"}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
              {playlist?.description ||
                "Explore this curated collection of videos"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr] gap-6 lg:gap-8">
            {playlist && videos && (
              <>
                <div className="order-1 lg:order-1">
                  <LeftPart playlistInfo={playlist} />
                </div>
                <div className="order-2 lg:order-2">
                  <RightPart videos={videos} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistIndividual;
