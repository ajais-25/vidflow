import React from "react";
import { Link } from "react-router-dom";

const SubscriptionCard = ({ channel }) => {
  return (
    <Link
      to={`/c/${channel?.username}`}
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl flex flex-col items-center space-y-4 active:scale-95 md:hover:scale-105 cursor-pointer transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-800/90"
    >
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full p-1">
          <img
            src={channel?.avatar}
            alt="avatar"
            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-gray-800 dark:text-white font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {channel?.fullName}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          @{channel?.username}
        </p>
      </div>
      <div className="w-full pt-2 border-t border-gray-100 dark:border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          View Channel
        </div>
      </div>
    </Link>
  );
};

export default SubscriptionCard;
