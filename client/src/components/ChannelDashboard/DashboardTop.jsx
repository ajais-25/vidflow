import React, { useState } from "react";

const DashboardTop = () => {
  const [isOwner, setIsOwner] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div>
            <h1 className="text-xl font-bold">Akshat Jaiswal</h1>
            <p>100K subscribers · 100 videos</p>
          </div>
        </div>
        {/* <button
          className={`${
            isOwner ? "bg-blue-500" : "bg-red-500"
          } text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg`}
        >
          {isOwner ? "Upload" : "Subscribe"}
        </button> */}
        {!isOwner && !isSubscribed && (
          <button
            className="bg-red-500 text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg"
            onClick={() => setIsSubscribed(true)}
          >
            Subscribe
          </button>
        )}
        {!isOwner && isSubscribed && (
          <button
            className="bg-gray-500 text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg"
            onClick={() => setIsSubscribed(false)}
          >
            Unsubscribe
          </button>
        )}
        {isOwner && (
          <button className="bg-blue-500 text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg">
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardTop;
