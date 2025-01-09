import axios from "axios";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { API } from "../../api";

const VideoPlayer = ({ videoId, videoUrl }) => {
  const viewVideo = async () => {
    try {
      await axios.get(`${API}/videos/view/${videoId}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    viewVideo();
  }, []);

  return (
    <div className="w-full h-80 rounded-lg">
      {/* Replace with a video player later */}
      <ReactPlayer
        url={videoUrl}
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
