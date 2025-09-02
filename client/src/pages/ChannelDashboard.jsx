import React, { useEffect, useState } from "react";
import DashboardTop from "../components/ChannelDashboard/DashboardTop";
import DashboardBottom from "../components/ChannelDashboard/DashboardBottom";
import axios from "axios";
import { API } from "../api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChannelDashboard = () => {
  const tabs = ["Videos", "Playlists"];
  const [tabSelected, setTabSelected] = useState("videos");
  const { username } = useParams();
  const [channelProfile, setChannelProfile] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylists, setChannelPlaylists] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const getChannelProfile = async () => {
    try {
      const response = await axios.get(`${API}/users/c/${username}`);
      // console.log(response.data.data);
      setChannelProfile(response.data.data);
      setIsSubscribed(response.data.data.isSubscribed);
    } catch (err) {
      console.log(err);
    }
  };

  const getChannelVideos = async () => {
    try {
      const response = await axios.get(`${API}/videos/u/${username}`);
      // console.log(response.data.data);
      setChannelVideos(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getChannelPlaylists = async () => {
    try {
      const response = await axios.get(`${API}/playlist/user/${username}`);
      // console.log(response.data.data);
      setChannelPlaylists(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChannelProfile();
    getChannelVideos();
    getChannelPlaylists();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative pt-20 pb-8 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Channel Info Section */}
          <DashboardTop
            channelProfile={channelProfile}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />

          {/* Tabs Section */}
          <div className="mt-8 mb-6">
            <div className="relative flex bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full p-1 max-w-md mx-auto shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              {/* Sliding Background Indicator */}
              <div
                className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                  tabSelected === "videos" ? "left-1" : "left-1/2"
                }`}
              />

              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabSelected(tab.toLowerCase())}
                  className={`relative z-10 flex-1 flex items-center justify-center py-3 rounded-full text-sm font-medium transition-all duration-300 text-center ${
                    tabSelected === tab.toLowerCase()
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          {((tabSelected === "videos" && channelVideos.length > 0) ||
            (tabSelected === "playlists" && channelPlaylists.length > 0)) && (
            <div className="mb-8 transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full transition-all duration-300"></div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-all duration-300">
                  {tabSelected === "videos" ? "Latest Videos" : "Playlists"}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-700 transition-all duration-300"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300">
                  {tabSelected === "videos"
                    ? `${channelVideos.length} ${
                        channelVideos.length === 1 ? "video" : "videos"
                      }`
                    : `${channelPlaylists.length} ${
                        channelPlaylists.length === 1 ? "playlist" : "playlists"
                      }`}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <DashboardBottom
            tabSelected={tabSelected}
            channelVideos={channelVideos}
            channelPlaylists={channelPlaylists}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelDashboard;
