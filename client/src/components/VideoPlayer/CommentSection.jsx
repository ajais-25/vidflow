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
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {comments?.length || 0} Comments
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-700"></div>
      </div>

      {/* Add Comment Input */}
      <div className="mb-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full ring-2 ring-blue-100 dark:ring-blue-800 overflow-hidden flex-shrink-0">
            <img
              src={user?.avatar}
              alt="Your avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a thoughtful comment..."
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <InfiniteScroll
        dataLength={comments.length}
        next={getVideoComments}
        hasMore={hasMore}
        scrollThreshold={1}
        loader={
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span className="font-medium">Loading more comments...</span>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {comments && comments.length > 0
            ? comments.map((comment) => (
                <div
                  key={comment._id}
                  className="group bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-700 overflow-hidden flex-shrink-0 transition-all duration-300">
                      <img
                        src={comment.owner.avatar}
                        alt={`${comment.owner.username}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          @{comment.owner.username}
                        </p>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{getTimeDifference(comment.createdAt)}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : !loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-blue-500 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No comments yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                    Be the first to share your thoughts about this video!
                  </p>
                </div>
              )}
          {loading && <CommentsLoader />}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CommentSection;
