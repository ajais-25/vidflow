import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { API } from "../../api";

const VideoPlayer = ({ videoId, video }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);

  const viewVideo = async () => {
    try {
      await axios.get(`${API}/videos/view/${videoId}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Check if window is available (for SSR compatibility)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    viewVideo();
  }, []);

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-inner">
        {(!video?.videoFile || !hasWindow) && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 sm:border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                {!video?.videoFile ? "Loading video..." : "Preparing player..."}
              </p>
            </div>
          </div>
        )}
        {video?.videoFile && hasWindow && (
          <div
            className={`player-wrapper w-full h-full ${
              !playerReady ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
          >
            <ReactPlayer
              ref={playerRef}
              url={video.videoFile}
              controls={true}
              playing={true}
              width="100%"
              height="100%"
              onReady={handlePlayerReady}
              playsinline={true}
              style={{ borderRadius: "8px" }}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                    disablePictureInPicture: true,
                    style: { width: "100%", height: "100%" },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6 px-1 sm:px-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight line-clamp-2">
          {video?.title}
        </h1>
      </div>
    </div>
  );
};

export default VideoPlayer;
