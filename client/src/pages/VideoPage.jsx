import CommentSection from "../components/VideoPlayer/CommentSection";
import VideoDescription from "../components/VideoPlayer/VideoDescription";
import VideoInfo from "../components/VideoPlayer/VideoInfo";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import VideoStats from "../components/VideoPlayer/VideoStats";

const VideoPage = () => {
  return (
    <div className="p-4 max-w-2xl mt-20 mx-auto rounded-lg">
      <VideoPlayer />
      <VideoInfo />
      <VideoStats />
      <VideoDescription />
      <CommentSection />
    </div>
  );
};

export default VideoPage;
