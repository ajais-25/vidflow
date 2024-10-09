import React, { useState } from "react";

const DashboardTop = () => {
  const [isOwner, setIsOwner] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div>
            <h1 className="text-xl font-bold">Akshat Jaiswal</h1>
            <p>100K subscribers · 100 videos</p>
          </div>
        </div>
        {/* <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Subscribe
        </button> */}
        <button
          className={`${
            isOwner ? "bg-blue-500" : "bg-red-500"
          } text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg`}
        >
          {isOwner ? "Upload" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default DashboardTop;
