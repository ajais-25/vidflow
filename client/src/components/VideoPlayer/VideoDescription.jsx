import { useState } from "react";

const VideoDescription = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aperiam ut harum accusantium dolor excepturi omnis repellendus minus, sint assumenda fugiat fugit sunt, quibusdam dolore at nostrum dignissimos cupiditate fuga culpa. Eligendi vel dicta id, odit dolorum laboriosam quasi modi?"
  );

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      <button
        onClick={toggleDescription}
        className="text-sm text-blue-500 dark:text-blue-400"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      <div
        className={`mt-2 transition-max-height duration-500 ease-in-out ${
          isExpanded ? "max-h-96" : "max-h-12 overflow-hidden"
        }`}
      >
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {isExpanded
            ? description
            : description.slice(0, 100) +
              (description.length > 100 ? "..." : "")}
        </p>
      </div>
    </div>
  );
};

export default VideoDescription;
