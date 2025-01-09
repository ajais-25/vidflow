import React, { useEffect, useState } from "react";
import { API } from "../../api";
import axios from "axios";

const CommentSection = ({ comments, videoId }) => {
  const [newComment, setNewComment] = useState("");

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
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700">
          {/* TODO: Add user avatar here */}
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 ml-4 p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleCommentSubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
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
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  @{comment.owner.username}
                </p>
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
