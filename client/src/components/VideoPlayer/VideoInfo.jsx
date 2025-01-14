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
    <div className="flex justify-between items-center mt-4">
      <Link
        to={`/c/${owner?.username}`}
        className="flex items-center hover:underline"
      >
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600">
          <img
            src={owner?.avatar || ""}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-semibold dark:text-white">
            {owner?.fullName || "John Doe"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {subscribers?.length} subscribers
          </p>
        </div>
      </Link>
      <div className="flex justify-end items-center mt-4 mb-4 sm:mt-0">
        {
          // If the user is the owner of the video, don't show the subscribe button
          user?._id === owner?._id ? null : (
            <button
              className={`${
                isSubscribed ? "bg-gray-500" : "bg-red-500"
              } text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg mr-2`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          )
        }
      </div>
    </div>
  );
};

export default VideoInfo;
