import { useState } from "react";

const VideoDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="py-3 sm:py-4">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">
            Description
          </h3>
        </div>
        {description?.length > 100 && (
          <button
            onClick={toggleDescription}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
          >
            {isExpanded ? (
              <>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Show less
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Show more
              </>
            )}
          </button>
        )}
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-96" : "max-h-16 sm:max-h-20"
        }`}
      >
        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-xl p-3 sm:p-4">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {isExpanded
              ? description || "No description available."
              : description?.slice(0, 100) +
                  (description?.length > 100 ? "..." : "") ||
                "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
