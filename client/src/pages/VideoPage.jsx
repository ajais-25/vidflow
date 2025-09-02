import { useParams } from "react-router-dom";
import CommentSection from "../components/VideoPlayer/CommentSection";
import VideoDescription from "../components/VideoPlayer/VideoDescription";
import VideoInfo from "../components/VideoPlayer/VideoInfo";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import VideoStats from "../components/VideoPlayer/VideoStats";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const getVideo = async () => {
    try {
      const response = await axios.get(`${API}/videos/${videoId}`);
      // console.log(response.data.data);
      setVideo(response.data.data);
      setIsSubscribed(response.data.data.isSubscribed);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // console.log(videoId);
    getVideo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Video Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-6">
            <VideoPlayer videoId={videoId} video={video} />
          </div>

          {/* Video Info and Stats Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
            <VideoInfo
              owner={video?.owner}
              subscribers={video?.subscribers}
              isSubscribed={isSubscribed}
              setIsSubscribed={setIsSubscribed}
            />
            <VideoStats
              videoId={videoId}
              views={video?.views}
              time={video?.createdAt}
            />
            <VideoDescription description={video?.description} />
          </div>

          {/* Comments Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
