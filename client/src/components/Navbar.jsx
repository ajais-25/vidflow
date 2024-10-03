import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div
      className="flex justify-between items-center z-10 p-4 shadow-md fixed top-0 left-0 right-0 bg-gray-100 dark:bg-gray-800"
      style={{ height: "4rem" }}
    >
      <button
        className="text-2xl p-2 flex justify-center items-center h-10 w-10 hover:bg-gray-300 dark:hover:bg-slate-700 rounded-full focus:outline-none"
        onClick={toggleSidebar}
      >
        &#9776;
      </button>
      <Link to="/">
        <h1 className="text-xl font-semibold cursor-pointer">VidFlow</h1>
      </Link>
      <div className="w-8 h-8 rounded-full cursor-pointer bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
};

export default Navbar;
