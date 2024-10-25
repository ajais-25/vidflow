import React, { useState } from "react";
import like from "../../assets/images/like.png";
import liked from "../../assets/images/liked.png";

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, username: "sarthak", text: "Loved the video" },
    { id: 2, username: "sarthak", text: "Loved the video" },
    { id: 3, username: "sarthak", text: "Loved the video" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, username: "you", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-full mt-4 p-4 rounded-lg">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        {comments.length} Comments
      </h2>

      {/* Add Comment Input */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
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
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <div className="ml-4">
              <p className="font-bold text-gray-900 dark:text-gray-100">
                @{comment.username}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
