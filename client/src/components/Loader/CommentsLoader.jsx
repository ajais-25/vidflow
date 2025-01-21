import React from "react";

const Skeleton = () => {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="ml-4">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-gray-900 dark:text-gray-100">@johndoe</p>
          <p className="text-gray-500 dark:text-gray-300">1 hour ago</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300">comment</p>
      </div>
    </div>
  );
};

const CommentsLoader = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

export default CommentsLoader;
