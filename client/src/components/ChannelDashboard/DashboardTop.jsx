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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full relative bg-gray-300 dark:bg-gray-700">
            <img
              src={avatar || ""}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            {user.username === channelProfile?.username && (
              <label htmlFor="edit">
                <input
                  type="file"
                  id="edit"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <MdModeEditOutline
                  id="edit"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
                />
              </label>
            )}
            <EditModal showModal={showModal} setShowModal={setShowModal} />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {user.username === channelProfile?.username
                ? user.fullName
                : channelProfile?.fullName || ""}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              @
              {user.username === channelProfile?.username
                ? user.username
                : channelProfile?.username || ""}
            </p>
            <p>
              {channelProfile?.subscribersCount || 0} subscribers ·{" "}
              {channelProfile?.channelsSubscribedToCount || 0} subscribed
            </p>
          </div>
        </div>
        {user.username === channelProfile?.username ? (
          <div className="flex space-x-4">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg
                transition-all duration-300 active:scale-95"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            <Link to="/upload">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Upload
              </button>
            </Link>
          </div>
        ) : (
          <button
            className={`${
              isSubscribed ? "bg-gray-500" : "bg-red-500"
            } text-white transition-all duration-300 active:scale-95 px-4 py-2 rounded-lg`}
            onClick={handleSubscribe}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardTop;
