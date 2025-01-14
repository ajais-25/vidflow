import React, { useState } from "react";
import { API } from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function getTimeDifference(updatedTime) {
  const currentTime = new Date();
  const updatedDate = new Date(updatedTime);

  const diffInMilliseconds = currentTime - updatedDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Approximate number of days in a month
  const years = Math.floor(days / 365.25); // Approximate number of days in a year

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const { videoId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const handleCommentSubmit = async () => {
    const content = newComment.trim();
    if (!content) return;

    try {
      const response = await axios.post(`${API}/comments/${videoId}`, {
        content,
      });
      console.log(response.data.data);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

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
      </div>
    </div>
  );
};

export default CommentSection;
