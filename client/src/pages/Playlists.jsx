// src/pages/PlaylistPage.jsx
import React, { useState } from "react";
import Playlist from "../components/playlist/Playlist";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    "Playlist 1",
    "Playlist 2",
    "Playlist 3",
    "Playlist 4",
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setMessage("Please fill in all fields");
    } else {
      setPlaylists([...playlists, name]);
      setShowModal(false);
      setName("");
      setDescription("");
      setMessage("");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen dark:bg-gray-900 py-24 px-10 flex flex-col relative">
        <div className="flex justify-between items-center gap-2 mb-10">
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Your Playlists
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="h-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-800"
          >
            Create
          </button>
        </div>
        <section
          className={`${
            showModal ? "block" : "hidden"
          } absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10`}
        >
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                <div
                  className="hover:bg-gray-300 hover:dark:bg-gray-600 transition-all duration-50 cursor-pointer rounded-md text-xl w-5 flex justify-center items-center absolute top-4 right-4"
                  onClick={() => setShowModal(false)}
                >
                  X
                </div>
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Playlist
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Playlist Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="My Playlist"
                      required=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="My favorite songs"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {message && (
                    <div className="text-red-500 text-sm font-medium text-center width-full">
                      {message}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
          {playlists.map((title, index) => (
            <Playlist key={index} title={title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Playlists;
