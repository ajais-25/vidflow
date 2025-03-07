import React, { useRef, useState } from "react";
import axios from "axios";
import { API } from "../api";
import { toast } from "react-toastify";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const thumbnailRef = useRef(null);
  const videoRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (!title || !description || !status || !videoFile || !thumbnail) {
      setIsUploading(false);
      return toast.error("Please fill in all fields");
    }

    try {
      setMessage("Uploading video...");
      const response = await axios.post(
        `${API}/videos`,
        {
          title,
          description,
          status,
          videoFile,
          thumbnail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setDescription("");
      setStatus("");
      setVideoFile(null);
      setThumbnail(null);
      thumbnailRef.current.value = "";
      videoRef.current.value = "";
      setStatus("");
      setMessage("");
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen mt-12 px-4 sm:px-2 flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Upload Video</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter video title"
                required
                value={title}
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
                value={description}
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
                  required
                  accept="video/*"
                  ref={videoRef}
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </div>
              <div className="flex flex-col justify-center">
                <label className="block text-sm font-medium mb-1">
                  Thumbnail*
                </label>
                <input
                  type="file"
                  className="cursor-pointer mt-1"
                  required
                  accept="image/*"
                  ref={thumbnailRef}
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Status*
              </label>
              <select
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            {message && (
              <div className="text-red-500 text-sm text-center">{message}</div>
            )}
            {/* Upload Button */}
            <button
              type="submit"
              disabled={isUploading ? true : false}
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
