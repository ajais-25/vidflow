import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div
      className={`fixed top-0 left-0 w-64 bg-gray-200 z-50 shadow-2xl dark:bg-gray-900 h-full transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ top: "4rem" }} // Set the top position to the height of the topbar
    >
      <ul className="flex flex-col p-4 space-y-4 mt-4">
        <li>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/c/${user?.username}`}
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/playlist"
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Playlists
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/liked-videos"
            className={({ isActive }) =>
              `p-2 rounded-lg block ${
                isActive
                  ? "bg-gray-400 dark:bg-gray-600"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`
            }
          >
            Liked Videos
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
