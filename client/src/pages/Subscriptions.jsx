import React from "react";
import SubscriptionCard from "../components/SubscriptionCard";

const Subscriptions = () => {
  const subscribersData = [
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
    { name: "Akshat Jaiswal", subscribers: "100K" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 mx-auto py-24 px-10">
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
        Your Subscriptions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {subscribersData.map((sub, index) => (
          <SubscriptionCard
            key={index}
            name={sub.name}
            subscribers={sub.subscribers}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
