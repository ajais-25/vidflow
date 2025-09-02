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
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isUploading, setIsUploading] = useState(false);

  const thumbnailRef = useRef(null);
  const videoRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

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
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      setTitle("");
      setDescription("");
      setStatus("");
      setVideoFile(null);
      setThumbnail(null);
      setThumbnailPreview(null);
      thumbnailRef.current.value = "";
      videoRef.current.value = "";
      setStatus("");
      setMessage("");
      setUploadProgress(0);
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading video");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Upload Your Video
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Share your content with the world
            </p>
          </div>

          {/* Upload Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter an engaging title for your video"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Description *
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    placeholder="Tell viewers about your video..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* File Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Video Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Video File *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        required
                        accept="video/*"
                        ref={videoRef}
                        onChange={(e) => setVideoFile(e.target.files[0])}
                      />
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200
                                    ${
                                      videoFile
                                        ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                                        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-700"
                                    }`}
                      >
                        <svg
                          className={`mx-auto h-8 w-8 mb-2 ${
                            videoFile ? "text-green-500" : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <p
                          className={`text-sm font-medium ${
                            videoFile
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {videoFile ? videoFile.name : "Click to upload video"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          MP4, MOV, AVI up to 2GB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Thumbnail *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        required
                        accept="image/*"
                        ref={thumbnailRef}
                        onChange={handleThumbnailChange}
                      />
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 relative overflow-hidden
                                    ${
                                      thumbnail
                                        ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                                        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-700"
                                    }`}
                      >
                        {thumbnailPreview ? (
                          <div className="relative">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                              <p className="text-white text-xs font-medium">
                                Click to change
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-8 w-8 text-gray-400 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Click to upload thumbnail
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              JPG, PNG up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Privacy Setting *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                             bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200 cursor-pointer"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose privacy setting
                    </option>
                    <option value="public">🌍 Public - Anyone can view</option>
                    <option value="private">
                      🔒 Private - Only you can view
                    </option>
                  </select>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {message}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 
                            ${
                              isUploading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            }`}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span>Upload Video</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
