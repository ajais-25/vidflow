import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateAvatar } from "../../features/authSlice";
import { MdModeEditOutline } from "react-icons/md";
import EditModal from "../EditModal";
import { toast } from "react-toastify";

const DashboardTop = ({ channelProfile, isSubscribed, setIsSubscribed }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(user?.avatar);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsSubscribed(channelProfile?.isSubscribed);
  }, []);

  const handleAvatarChange = async (e) => {
    try {
      const response = await axios.patch(
        `${API}/users/avatar`,
        {
          avatar: e.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAvatar(response.data.data);
      dispatch(updateAvatar({ avatar: response.data.data }));
      toast.success("Avatar updated successfully");
    } catch (error) {
      console.log(error);
      setAvatar(user.avatar);
      toast.error("Failed to update avatar");
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `${API}/subscriptions/c/${channelProfile?._id}`
      );
      setIsSubscribed((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-emerald-50/50 dark:from-blue-900/10 dark:to-emerald-900/10 rounded-3xl"></div>

      {/* Main Content */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 flex-grow">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 p-1">
                <img
                  src={avatar || ""}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover bg-gray-200 dark:bg-gray-700"
                />
              </div>
              {user.username === channelProfile?.username && (
                <label
                  htmlFor="edit"
                  className="absolute -bottom-2 -right-2 cursor-pointer group"
                >
                  <input
                    type="file"
                    id="edit"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <MdModeEditOutline className="w-4 h-4" />
                  </div>
                </label>
              )}
            </div>

            {/* Channel Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                {user.username === channelProfile?.username
                  ? user.fullName
                  : channelProfile?.fullName || ""}
              </h1>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                @
                {user.username === channelProfile?.username
                  ? user.username
                  : channelProfile?.username || ""}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-full">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {channelProfile?.subscribersCount || 0} subscribers
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-full">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {channelProfile?.channelsSubscribedToCount || 0} subscribed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {user.username === channelProfile?.username ? (
              <>
                <button
                  className="group flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => setShowModal(true)}
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
                <Link to="/upload">
                  <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Upload Video
                  </button>
                </Link>
              </>
            ) : (
              <button
                className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isSubscribed
                    ? "bg-gray-500 hover:bg-gray-600 text-white"
                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                }`}
                onClick={handleSubscribe}
              >
                {isSubscribed ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Subscribed
                  </>
                ) : (
                  <>
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Subscribe
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <EditModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default DashboardTop;
