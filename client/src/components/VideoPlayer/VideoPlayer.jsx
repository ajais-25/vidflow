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
    <div className="p-6">
      <div className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-inner">
        {!video?.videoFile && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Loading video...
              </p>
            </div>
          </div>
        )}
        {video?.videoFile && (
          <ReactPlayer
            url={video?.videoFile}
            controls={true}
            playing={true}
            width="100%"
            height="100%"
            style={{ borderRadius: "12px" }}
          />
        )}
      </div>
      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
          {video?.title}
        </h1>
      </div>
    </div>
  );
};

export default VideoPlayer;
