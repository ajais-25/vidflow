import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import avatar_black from "../assets/images/avatar_black.png";
import avatar_white from "../assets/images/avatar_white.png";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../api";

const Navbar = ({ toggleSidebar }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const themeBtnRef = useRef(null);
  const profileRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
    setIsDarkTheme(savedTheme === "dark");
    themeBtnRef.current.checked = savedTheme === "dark";
    setCurrentUser(user);
  }, [user]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const joinedDate =
    (currentUser &&
      new Date(currentUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })) ||
    "";
  const userAvatar = user?.avatar;

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    setIsDarkTheme(!isDarkTheme);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/users/logout`);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-50/90 to-blue-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl border-b border-blue-200/30 dark:border-blue-700/30"
      style={{ height: "4rem" }}
    >
      <div className="flex justify-between items-center h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Menu Button */}
          <button
            className="p-2 rounded-xl bg-blue-100/70 dark:bg-blue-900/30 hover:bg-blue-200/80 dark:hover:bg-blue-800/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-md"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-5 h-5 text-blue-700 dark:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              VidFlow
            </h1>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <div className="p-1">
            <ThemeToggle refer={themeBtnRef} toggleTheme={toggleTheme} />
          </div>

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              onClick={handleProfileClick}
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-700 shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  src={
                    userAvatar || (isDarkTheme ? avatar_white : avatar_black)
                  }
                  alt="User avatar"
                />
              </div>
            </button>

            {/* Enhanced Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/30 dark:border-blue-700/30 overflow-hidden transform transition-all duration-200 scale-100">
                {/* User Info Header */}
                <div className="p-6 bg-gradient-to-r from-blue-500 to-emerald-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-3 ring-white/30 shadow-lg">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          userAvatar ||
                          (isDarkTheme ? avatar_white : avatar_black)
                        }
                        alt="User avatar"
                      />
                    </div>
                    <div className="text-white">
                      <p className="font-semibold text-lg">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-blue-100 text-sm">@{user?.username}</p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-4 border-b border-blue-200/30 dark:border-blue-700/30">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {user?.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Joined:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {joinedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 space-y-2">
                  <Link
                    to={`/c/${user?.username}`}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      View Profile
                    </span>
                  </Link>

                  <Link
                    to="/upload"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      Upload Video
                    </span>
                  </Link>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-blue-200/30 dark:border-blue-700/30">
                  <button
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 font-medium"
                    onClick={handleLogout}
                  >
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
