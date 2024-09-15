import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 bg-gray-200 dark:bg-gray-900 h-full transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ top: "4rem" }} // Set the top position to the height of the topbar
    >
      <div className="flex flex-col p-4 space-y-4 mt-8">
        <button className="bg-gray-300 dark:bg-gray-700 p-2 rounded-lg">
          Upload
        </button>
        <a
          href="#"
          className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          Home
        </a>
        <a
          href="#"
          className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          Your Channel
        </a>
        <a
          href="#"
          className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          History
        </a>
        <a
          href="#"
          className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          Playlists
        </a>
        <a
          href="#"
          className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          Liked videos
        </a>
        <a
          href="#"
          className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          Subscriptions
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
