import React, { useEffect, useState } from "react";
import SubscriptionCard from "../components/SubscriptionCard";
import axios from "axios";
import { API } from "../api";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState("Loading...");

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(`${API}/subscriptions`);
      // console.log(response.data.data);
      setSubscriptions(response.data.data);
      setMessage("No subscriptions found");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 mx-auto py-24 px-10">
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
        Your Subscriptions
      </p>
      {subscriptions.length === 0 && (
        <p className="text-lg text-center text-gray-500 dark:text-gray-400">
          {message}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {subscriptions &&
          subscriptions.map((channel, index) => (
            <SubscriptionCard key={index} channel={channel} />
          ))}
      </div>
    </div>
  );
};

export default Subscriptions;
