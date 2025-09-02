import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full"></div>

      {/* Name skeleton */}
      <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>

      {/* Username skeleton */}
      <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>

      {/* Bottom section skeleton */}
      <div className="w-full pt-2 border-t border-gray-100 dark:border-gray-700/50">
        <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto"></div>
      </div>
    </div>
  );
};

const SubscriptionsLoader = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

export default SubscriptionsLoader;
