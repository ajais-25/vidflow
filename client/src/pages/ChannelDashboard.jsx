import React, { useState } from "react";
import DashboardTop from "../components/ChannelDashboard/DashboardTop";
import DashboardBottom from "../components/ChannelDashboard/DashboardBottom";

const ChannelDashboard = () => {
  const tabs = ["Videos", "Playlists"];
  const [tabSelected, setTabSelected] = useState("videos");

  return (
    <div>
      <div className="min-h-screen py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Channel Info Section */}
        <DashboardTop />

        {/* Tabs Section */}
        <div className="sticky top-16 bg-white dark:bg-gray-900 z-10 border-b border-gray-300 dark:border-gray-700">
          <div className="flex justify-center space-x-6 py-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setTabSelected(tab.toLowerCase())}
                className={`${
                  tabSelected === tab.toLowerCase()
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* From here send Playlist and Videos after API call */}
        <DashboardBottom tabSelected={tabSelected} />
      </div>
    </div>
  );
};

export default ChannelDashboard;
