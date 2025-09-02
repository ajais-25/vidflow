import axios from "axios";
import React, { useState } from "react";
import { API } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../features/authSlice";
import { toast } from "react-toastify";

const EditModal = ({ showModal, setShowModal }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.patch(`${API}/users/update-account`, {
        fullName: name,
        email,
      });
      dispatch(updateAccount({ name, email }));
      setShowModal(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className={`${
        showModal ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-custom z-20`}
    >
      <div className="flex flex-col mt-40 sm:mt-0 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200/20 dark:border-blue-700/20 md:mt-0 sm:max-w-lg xl:p-0 transform transition-all duration-300 hover:shadow-3xl">
          <div className="p-8 space-y-6 relative">
            {/* Close Button */}
            <button
              className="group absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-110"
              onClick={() => setShowModal(false)}
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                Edit Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Update your account information
              </p>
            </div>

            <form className="space-y-6" action="#">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-blue-100 dark:border-blue-800 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400"
                      placeholder="Enter your full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-blue-100 dark:border-blue-800 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400"
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                  onClick={handleSubmit}
                >
                  <span className="flex items-center justify-center gap-2">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Update Profile
                  </span>
                </button>
              </div>
            </form>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditModal;
