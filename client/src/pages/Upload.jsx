import React, { useState } from "react";
import upload_black from "../assets/images/upload_black.png";

const Upload = () => {
  return (
    <div>
      <div className="min-h-screen mt-8 flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Upload Video</h1>
          </div>
          <form className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter video title"
                required
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
              ></textarea>
            </div>

            {/* Thumbnail & Video */}
            <div className="flex flex-col gap-6 justify-center sm:flex-row sm:justify-between">
              <div className="flex flex-col justify-center">
                <label className="block text-sm font-medium mb-1">Video*</label>
                <label className="w-44 h-32 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex justify-center items-center cursor-pointer rounded-md border dark:border-gray-600">
                  <img
                    src={upload_black}
                    alt="upload"
                    className="h-8 w-8 rounded-full"
                  />
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    required
                  />
                </label>
              </div>
              <div className="flex flex-col justify-center">
                <label className="block text-sm font-medium mb-1">
                  Thumbnail*
                </label>
                <label className="w-44 h-32 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex justify-center items-center cursor-pointer rounded-md border dark:border-gray-600">
                  <img
                    src={upload_black}
                    alt="upload"
                    className="h-8 w-8 rounded-full"
                  />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    required
                  />
                </label>
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
