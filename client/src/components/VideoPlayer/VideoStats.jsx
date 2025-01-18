import { useEffect, useState } from "react";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
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
    <div className="text-sm flex justify-between items-center text-gray-600 dark:text-gray-400 mt-4">
      <p>
        {views} views • {timeDifference}{" "}
      </p>
      <div className="flex justify-between items-center gap-2">
        <button
          className="flex items-center justify-center gap-1 p-2 rounded-md transition-colors duration-300 
                  text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={isLiked ? "Unlike" : "Like"}
          onClick={handleLike}
        >
          {isLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}{" "}
          {getLikes(likes)}
        </button>
        <button
          className="bg-primary-600 hover:bg-primary-800 text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg mr-2"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
      </div>
      <AddToPlaylistModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default VideoStats;
