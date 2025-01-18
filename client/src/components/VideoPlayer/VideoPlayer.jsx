import axios from "axios";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { API } from "../../api";

const VideoPlayer = ({ videoId, video }) => {
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
    <div>
      <div className="w-full h-80 rounded-lg">
        {/* Replace with a video player later */}
        {!video?.videoFile && (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg">
            <p className="text-white">Loading...</p>
          </div>
        )}
        <ReactPlayer
          url={video?.videoFile}
          controls={true}
          playing={true}
          width="100%"
          height="100%"
        />
      </div>
      <h1 className="text-xl font-semibold mt-4">{video?.title}</h1>
    </div>
  );
};

export default VideoPlayer;
