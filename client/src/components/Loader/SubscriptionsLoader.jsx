import React from "react";

const Skeleton = () => {
  return <div className="skeleton h-32 w-32"></div>;
};

const SubscriptionsLoader = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

export default SubscriptionsLoader;
