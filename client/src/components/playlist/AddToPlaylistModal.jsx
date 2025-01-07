import React, { useState } from "react";

const AddToPlaylistModal = ({ showModal, setShowModal }) => {
  const playlists = ["Playlist 1", "Playlist 2", "Playlist 3", "Playlist 4"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add to playlist");
  };

  const handleAddToPlaylist = (playlist) => {
    console.log(playlist);
  };

  return (
    <section
      className={`${
        showModal ? "block" : "hidden"
      } absolute top-0 left-0 w-full h-full bg-gray-900 dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-50 z-10`}
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
              Select Playlist
            </h1>
            <form action="">
              <ul
                className="w-full mt-4 overflow-y-auto max-h-60"
                style={{ scrollbarWidth: "thin" }}
              >
                {playlists.map((playlist) => (
                  <li
                    className="cursor-pointer mb-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-50 rounded-md p-2 px-4"
                    key={playlist}
                    onClick={() => handleAddToPlaylist(playlist)}
                  >
                    {playlist}
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                className="w-full text-white mt-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Add to Playlist
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddToPlaylistModal;
