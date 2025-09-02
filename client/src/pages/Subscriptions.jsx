import React, { useEffect, useState } from "react";
import SubscriptionCard from "../components/SubscriptionCard";
import axios from "axios";
import { API } from "../api";
import SubscriptionsLoader from "../components/Loader/SubscriptionsLoader";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(`${API}/subscriptions`);
      // console.log(response.data.data);
      setSubscriptions(response.data.data);
      setLoading(false);
      setMessage("No subscriptions found");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("Failed to load subscriptions");
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative pt-20 pb-8 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              Your Subscriptions
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Stay connected with your favorite creators and never miss their
              latest content
            </p>
          </div>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="px-4 sm:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {subscriptions.length > 0 && !loading && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Subscribed Channels
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-700"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  {subscriptions.length}{" "}
                  {subscriptions.length === 1 ? "channel" : "channels"}
                </span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && subscriptions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Subscriptions Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                Start following your favorite creators to see their latest
                videos and updates here.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Discover Creators
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-8 mb-8">
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">
                  Loading your subscriptions...
                </span>
              </div>
            </div>
          )}

          {/* Subscriptions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1736px]:grid-cols-6 min-[2250px]:grid-cols-7 gap-6">
            {loading && <SubscriptionsLoader />}
            {subscriptions &&
              subscriptions.map((channel, index) => (
                <SubscriptionCard key={index} channel={channel} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
