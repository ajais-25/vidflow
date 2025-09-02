import React from "react";

const Skeleton = () => {
  return (
    <div className="group flex flex-col active:scale-95 md:hover:scale-105 transition-all duration-300 cursor-pointer items-center">
      {/* Modern stacked card design with shimmer effect */}
      <div className="w-full h-44 relative">
        {/* Background cards with gradient shimmer */}
        <div className="w-full h-44 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg absolute top-2 transform rotate-1 animate-pulse"></div>
        <div className="w-full h-44 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg absolute top-4 transform -rotate-1 animate-pulse"></div>

        {/* Main skeleton card */}
        <div className="w-full h-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl relative overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>

          {/* Video count badge skeleton */}
          <div className="absolute -bottom-2 right-2 z-10 px-3 py-1.5 rounded-full shadow-lg bg-gray-300 dark:bg-gray-600 animate-pulse">
            <div className="w-8 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
        </div>
      </div>

      {/* Title skeleton */}
      <div className="mt-6 text-center px-2 w-full">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto"></div>
      </div>
    </div>
  );
};

const PlaylistLoader = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

export default PlaylistLoader;
