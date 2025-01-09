import React, { useEffect, useState } from "react";
import avatar_black from "../../assets/images/avatar_black.png";
import avatar_white from "../../assets/images/avatar_white.png";
import axios from "axios";
import { API } from "../../api";

const DashboardTop = ({ channelProfile, isSubscribed, setIsSubscribed }) => {
  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  // if (document.documentElement.classList.contains("dark")) {
  //   setIsDarkTheme(true);
  // }

  // const [isOwner, setIsOwner] = useState(false);
  // fix this later
  // if(channelProfile?._id === user._id) {
  //   setIsOwner(true);
  // }

  useEffect(() => {
    setIsSubscribed(channelProfile?.isSubscribed);
  }, []);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `${API}/subscriptions/c/${channelProfile?._id}`
      );
      setIsSubscribed((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700">
            <img
              src={
                channelProfile?.avatar ||
                // (isDarkTheme ? avatar_white : avatar_black)
                ""
              }
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {channelProfile?.fullName || ""}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              @{channelProfile?.username || ""}
            </p>
            <p>
              {channelProfile?.subscribersCount || 0} subscribers ·{" "}
              {channelProfile?.channelsSubscribedToCount || 0} subscribed
            </p>
          </div>
        </div>
        <button
          className={`${
            isSubscribed ? "bg-gray-500" : "bg-red-500"
          } text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg`}
          onClick={handleSubscribe}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default DashboardTop;
