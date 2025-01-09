import { useState } from "react";

const VideoDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShowMore, setShowShowMore] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      <span className="block">Description:</span>
      {description?.length > 100 && (
        <button
          onClick={toggleDescription}
          className="text-sm text-blue-500 dark:text-blue-400"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
      <div
        className={`mt-2 transition-max-height duration-500 ease-in-out ${
          isExpanded ? "max-h-96" : "max-h-12"
        }`}
      >
        <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-100 dark:bg-blue-900 p-2 px-4 rounded-lg">
          {isExpanded
            ? description
            : description?.slice(0, 100) +
              (description?.length > 100 ? "..." : "")}
        </p>
      </div>
    </div>
  );
};

export default VideoDescription;
