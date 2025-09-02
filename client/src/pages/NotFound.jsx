import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Content without background container */}
        <div className="p-8 sm:p-12 text-center">
          {/* 404 Icon with gradient background */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* 404 Number with gradient */}
          <h1 className="mb-6 text-6xl sm:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
            404
          </h1>

          {/* Main heading */}
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Oops! Page Not Found
          </h2>

          {/* Description */}
          <p className="mb-8 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void. Let's get you back to discovering amazing content!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 w-full sm:w-auto justify-center"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-300/20 to-blue-300/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
