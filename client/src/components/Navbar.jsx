import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import avatar_black from "../assets/images/avatar_black.png";
import avatar_white from "../assets/images/avatar_white.png";

const Navbar = ({ toggleSidebar }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkTheme(!isDarkTheme);
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {};

  return (
    <div
      className="flex justify-between items-center z-50 p-4 shadow-md fixed top-0 left-0 right-0 bg-white dark:bg-gray-800"
      style={{ height: "4rem" }}
    >
      <button
        className="text-2xl p-2 flex justify-center items-center h-10 w-10 active:bg-gray-300 md:hover:bg-gray-300 dark:md:hover:bg-slate-700 dark:active:bg-slate-700 rounded-full focus:outline-none"
        onClick={toggleSidebar}
      >
        &#9776;
      </button>

      <Link to="/">
        <h1 className="text-xl font-semibold cursor-pointer">VidFlow</h1>
      </Link>

      <div className="flex items-center">
        {/* Theme Toggle Button */}
        <ThemeToggle toggleTheme={toggleTheme} />

        {/* Profile Section */}
        <div className="relative ml-4">
          <div
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              className="h-full w-full rounded-full"
              src={isDarkTheme ? avatar_white : avatar_black}
              alt="avatar"
            />
          </div>

          {/* Dropdown Box */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Joined: Jan 2023
              </p>
              <button
                className="mt-4 w-full text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
