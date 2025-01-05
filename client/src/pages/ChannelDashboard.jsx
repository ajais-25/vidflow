import React, { useEffect, useState } from "react";
import DashboardTop from "../components/ChannelDashboard/DashboardTop";
import DashboardBottom from "../components/ChannelDashboard/DashboardBottom";
import axios from "axios";
import { API } from "../api";
import { useParams } from "react-router-dom";

const ChannelDashboard = () => {
  const tabs = ["Videos", "Playlists"];
  const [tabSelected, setTabSelected] = useState("videos");
  const { username } = useParams();
  const [channelProfile, setChannelProfile] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylists, setChannelPlaylists] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      const response = await axios.get(`${API}/videos/${username}`);
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
  }, []);

  return (
    <div>
      <div className="min-h-screen py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Channel Info Section */}
        <DashboardTop
          channelProfile={channelProfile}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />

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
        <DashboardBottom
          tabSelected={tabSelected}
          channelVideos={channelVideos}
          channelPlaylists={channelPlaylists}
        />
      </div>
    </div>
  );
};

export default ChannelDashboard;
