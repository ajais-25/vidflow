import React from "react";
import { Link } from "react-router-dom";

const Playlist = ({ playlist }) => {
  return (
    <Link
      to={`/playlist/${playlist?._id}`}
      className="group flex flex-col active:scale-95 md:hover:scale-105 transition-all duration-300 cursor-pointer items-center"
    >
      {/* Modern stacked card design with enhanced styling */}
      <div className="w-full h-44 relative">
        {/* Background cards with gradient shadows */}
        <div className="w-full h-44 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-xl shadow-lg absolute top-2 transform rotate-1 group-hover:rotate-2 transition-all duration-300"></div>
        <div className="w-full h-44 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/40 dark:to-blue-900/40 rounded-xl shadow-lg absolute top-4 transform -rotate-1 group-hover:-rotate-2 transition-all duration-300"></div>

        {/* Main thumbnail card */}
        <div className="w-full h-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl relative overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:shadow-2xl transition-all duration-300">
          {playlist?.videos?.[0]?.thumbnail ? (
            <img
              src={playlist?.videos?.[0]?.thumbnail}
              alt={playlist?.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-blue-400 dark:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          )}

          {/* Video count badge with better positioning */}
          <div className="absolute bottom-2 right-2 z-10 px-3 py-1.5 rounded-full shadow-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-sm font-bold">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-white font-bold">
                {playlist?.videos?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist title with enhanced typography */}
      <div className="mt-6 text-center px-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {playlist?.name || "Untitled Playlist"}
        </h3>
        {playlist?.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {playlist.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Playlist;
