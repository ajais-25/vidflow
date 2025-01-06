import React from "react";
import { Link } from "react-router-dom";

const SubscriptionCard = ({ channel }) => {
  return (
    <Link
      to={`/c/${channel?.username}`}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2 active:scale-95 md:hover:scale-105 cursor-pointer transition-all duration-300"
    >
      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full">
        <img
          src={channel?.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <h3 className="text-black dark:text-white font-semibold">
        {channel?.fullName}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        @{channel?.username}
      </p>
    </Link>
  );
};

export default SubscriptionCard;
