import React, { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="flex items-center justify-center p-2 rounded-full transition-colors duration-300 
                 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth={liked ? "0" : "2"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 9V5a3 3 0 10-6 0v4H4a2 2 0 00-2 2v6a2 2 0 002 2h4.68a2 2 0 001.59-.76l3.27-4.36a1.25 1.25 0 01.99-.38H20a2 2 0 002-2v-1.34a2 2 0 00-2-2h-6z"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
