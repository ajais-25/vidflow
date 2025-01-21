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
    <div className="p-4 max-w-2xl sm:mt-20 mx-auto rounded-lg">
      <VideoPlayer videoId={videoId} video={video} />
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
      <CommentSection />
    </div>
  );
};

export default VideoPage;
