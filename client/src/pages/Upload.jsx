import React, { useState } from "react";
import upload_black from "../assets/images/upload_black.png";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, description, status, video, thumbnail);
  };

  return (
    <div>
      <div className="min-h-screen mt-8 flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Upload Video</h1>
          </div>
          <form
            className="space-y-4"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter video title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description*
              </label>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Add description..."
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Thumbnail & Video */}
            <div className="flex flex-col gap-6 justify-center sm:justify-between">
              <div className="flex flex-col justify-center">
                <label className="block text-sm font-medium mb-1">Video*</label>
                <input
                  type="file"
                  className="cursor-pointer mt-1"
                  accept="video/*"
                  required
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>
              <div className="flex flex-col justify-center">
                <label className="block text-sm font-medium mb-1">
                  Thumbnail*
                </label>
                <input
                  type="file"
                  className="cursor-pointer mt-1"
                  accept="image/*"
                  required
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <span className="block text-sm font-medium mb-1">
                Select Status*
              </span>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="public"
                    required
                    className="cursor-pointer"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2">Public</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="private"
                    required
                    className="cursor-pointer"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2">Private</span>
                </label>
              </div>
            </div>

            {/* Upload Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
