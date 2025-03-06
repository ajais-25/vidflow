import React, { useEffect, useState } from "react";
import { API } from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimeDifference } from "../../utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import CommentsLoader from "../Loader/CommentsLoader";

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const { videoId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async () => {
    const content = newComment.trim();
    if (!content) return;

    try {
      const response = await axios.post(`${API}/comments/${videoId}`, {
        content,
      });
      // console.log(response.data.data);
      setNewComment("");
      setComments((prev) => [response.data.data, ...prev]);
      toast.success("Comment added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoComments = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${API}/comments/${videoId}?page=${page}`
        );
        // console.log(response.data.data);
        const newComments = response.data.data;
        setComments((prev) => [...prev, ...newComments]);
        setLoading(false);
        setPage((prev) => prev + 1);
        if (newComments.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, 300);
  };

  useEffect(() => {
    getVideoComments();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-full mt-4 p-4 rounded-lg">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        {comments?.length || 0} Comments
      </h2>

      {/* Add Comment Input */}
      <div className="flex-col items-center mb-6">
        <div className="flex items-center w-full">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700">
            <img
              src={user?.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 ml-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <button
          onClick={handleCommentSubmit}
          className="mt-4 w-full sm:w-fit px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Comment
        </button>
      </div>

      {/* Comments List */}
      <InfiniteScroll
        dataLength={comments.length}
        next={getVideoComments}
        hasMore={hasMore}
        scrollThreshold={1} // Trigger API call when 100% scrolled
      >
        <div className="space-y-4">
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700">
                  <img
                    src={comment.owner.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      @{comment.owner.username}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      {getTimeDifference(comment.createdAt)}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          {loading && <CommentsLoader />}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CommentSection;
