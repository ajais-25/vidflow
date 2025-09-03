import { useEffect, useState } from "react";
import AddToPlaylistModal from "../PlaylistComp/AddToPlaylistModal";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { getTimeDifference } from "../../utils";
import axios from "axios";
import { API } from "../../api";

function getLikes(likes) {
  if (likes < 1000) {
    return likes;
  } else if (likes < 1000000) {
    return `${(likes / 1000).toFixed(1)}K`.replace(".0", "");
  } else {
    return `${(likes / 1000000).toFixed(1)}M`.replace(".0", "");
  }
}

const VideoStats = ({ videoId, views, time }) => {
  const timeDifference = getTimeDifference(time);
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
    try {
      const response = await axios.post(`${API}/likes/toggle/v/${videoId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoLikes = async () => {
    try {
      const response = await axios.get(`${API}/likes/v/${videoId}`);
      setLikes(response.data.data.videoLikes.length);
      setIsLiked(response.data.data.isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoLikes();
  }, [videoId]);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="font-medium">{views} views</span>
        </div>
        <span className="text-gray-400">•</span>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">{timeDifference}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
        <button
          className={`group flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg border-2 text-xs sm:text-sm ${
            isLiked
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              : "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-label={isLiked ? "Unlike" : "Like"}
          onClick={handleLike}
        >
          {isLiked ? <BiSolidLike size={18} /> : <BiLike size={18} />}
          <span className="font-medium">{getLikes(likes)}</span>
        </button>

        <button
          className="group flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-xl font-medium transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl border-2 border-transparent text-xs sm:text-sm"
          onClick={() => setShowModal(true)}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Add to Playlist</span>
        </button>
      </div>

      <AddToPlaylistModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default VideoStats;
