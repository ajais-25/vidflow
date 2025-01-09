import { useState } from "react";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import axios from "axios";
import { API } from "../../api";
import { Link } from "react-router-dom";

const VideoInfo = ({
  owner,
  subscribers,
  isSubscribed,
  setIsSubscribed,
  videoId,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${API}/subscriptions/c/${owner._id}`);
      setIsSubscribed((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
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
      <div>
        <button
          className="bg-primary-600 hover:bg-primary-800 text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg mr-2"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
        <AddToPlaylistModal
          showModal={showModal}
          setShowModal={setShowModal}
          video={videoId}
        />
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
