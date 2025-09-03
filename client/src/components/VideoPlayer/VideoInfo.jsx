import axios from "axios";
import { API } from "../../api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoInfo = ({ owner, subscribers, isSubscribed, setIsSubscribed }) => {
  const user = useSelector((state) => state.auth.user);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${API}/subscriptions/c/${owner._id}`);
      setIsSubscribed((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200/50 dark:border-gray-700/50 pb-4">
      <Link
        to={`/c/${owner?.username}`}
        className="flex items-center group transition-all duration-300 hover:scale-105"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-blue-100 dark:ring-blue-800 group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all duration-300 overflow-hidden">
          <img
            src={owner?.avatar || ""}
            alt="Channel Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 sm:ml-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
            {owner?.fullName || "John Doe"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {subscribers?.length} subscribers
          </p>
        </div>
      </Link>
      <div className="flex justify-start sm:justify-end items-center mt-2 sm:mt-0">
        {
          // If the user is the owner of the video, don't show the subscribe button
          user?._id === owner?._id ? null : (
            <button
              className={`group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                isSubscribed
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-2 border-transparent"
              }`}
              onClick={handleSubscribe}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isSubscribed ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                )}
              </svg>
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          )
        }
      </div>
    </div>
  );
};

export default VideoInfo;
