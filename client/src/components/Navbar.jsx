import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div
      className="flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800"
      style={{ height: "4rem" }}
    >
      <button
        className="text-2xl p-2 focus:outline-none"
        onClick={toggleSidebar}
      >
        &#9776;
      </button>
      <h1 className="text-xl font-semibold">VidFlow</h1>
      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
};

export default Navbar;
