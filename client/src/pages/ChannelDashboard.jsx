import React from "react";
import VideoCard from "../components/VideoCard";

const ChannelDashboard = () => {
  return (
    <div>
      <div className="min-h-screen py-14 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Channel Info Section */}
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div>
                <h1 className="text-xl font-bold">Akshat Jaiswal</h1>
                <p>100K subscribers · 100 videos</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Upload
            </button>
          </div>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
            Subscribe
          </button>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-gray-300 dark:border-gray-700">
          <div className="flex justify-center space-x-6 py-2">
            <button className="font-medium hover:text-blue-500">Videos</button>
            <button className="font-medium hover:text-blue-500">
              Playlists
            </button>
          </div>
        </div>

        {/* Videos Section */}
        <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <VideoCard isChannelDashboard={true} />
          <VideoCard isChannelDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default ChannelDashboard;
