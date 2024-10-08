import React from "react";

const SubscriptionCard = ({ name, subscribers }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2 active:scale-95 md:hover:scale-105 cursor-pointer transition-all duration-300">
      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <h3 className="text-black dark:text-white font-semibold">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {subscribers} subscribers
      </p>
    </div>
  );
};

export default SubscriptionCard;
