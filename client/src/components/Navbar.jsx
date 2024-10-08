import React from "react";
import { Link } from "react-router-dom";
import avatar_black from "../assets/images/avatar_black.png";
import avatar_white from "../assets/images/avatar_white.png";

const Navbar = ({ toggleSidebar }) => {
  const isDarkTheme = document.documentElement.classList.contains("dark");

  return (
    <div
      className="flex justify-between items-center z-50 p-4 shadow-md fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-800"
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
      <div className="w-8 h-8 rounded-full cursor-pointer">
        <img
          className="h-full w-full"
          src={isDarkTheme ? avatar_white : avatar_black}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
