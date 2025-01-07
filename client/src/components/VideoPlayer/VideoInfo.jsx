import { useState } from "react";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";

const VideoInfo = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600"></div>
        <div className="ml-4">
          <h3 className="text-sm font-semibold dark:text-white">
            Akshat Jaiswal
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            100K subscribers
          </p>
        </div>
      </div>
      <div>
        <button
          className="bg-primary-600 hover:bg-primary-800 text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg mr-2"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
        <AddToPlaylistModal showModal={showModal} setShowModal={setShowModal} />
        <button
          className={`${
            isSubscribed ? "bg-gray-500" : "bg-red-500"
          } text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg`}
          onClick={handleSubscribe}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;
