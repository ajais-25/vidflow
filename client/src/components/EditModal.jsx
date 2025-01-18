import axios from "axios";
import React, { useState } from "react";
import { API } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../features/authSlice";

const EditModal = ({ showModal, setShowModal }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setModalMessage("Updating...");
      const response = await axios.patch(`${API}/users/update-account`, {
        fullName: name,
        email,
      });
      dispatch(updateAccount({ name, email }));
      setModalMessage("");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setModalMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className={`${
        showModal ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-gray-900 dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-50 z-20`}
    >
      <div className="flex flex-col mt-40 sm:mt-0 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
            <div
              className="hover:bg-gray-300 hover:dark:bg-gray-600 transition-all duration-50 cursor-pointer rounded-md text-xl w-5 flex justify-center items-center absolute top-4 right-4"
              onClick={() => {
                setShowModal(false);
              }}
            >
              X
            </div>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit Profile
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {modalMessage && (
                <div className="text-red-500 text-sm font-medium text-center width-full">
                  {modalMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditModal;
