import React, { useEffect, useState } from "react";
import Playlist from "../components/PlaylistComp/Playlist";
import axios from "axios";
import { API } from "../api";
import PlaylistLoader from "../components/Loader/PlaylistLoader";
import { toast } from "react-toastify";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const getUserPlaylists = async () => {
    try {
      const response = await axios.get(`${API}/playlist`);
      // console.log(response.data.data);
      setPlaylists(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Please fill all the fields.");
    } else {
      try {
        const response = await axios.post(`${API}/playlist`, {
          name,
          description,
        });
        setPlaylists([...playlists, response.data.data]);
        toast.success("Playlist created successfully");
      } catch (error) {
        console.log(error);
      }

      setShowModal(false);
      setName("");
      setDescription("");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative pt-20 pb-8 px-4 sm:px-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
                Your Creative Playlists
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Organize your favorite videos into custom collections
              </p>
            </div>

            {/* Create Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:rotate-90"
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
                Create New Playlist
              </button>
            </div>
          </div>
        </div>

        {/* Playlists Section */}
        <div className="px-4 sm:px-10 pb-12">
          <div className="max-w-7xl mx-auto">
            {playlists.length > 0 && !loading && (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    My Playlists
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-700"></div>
                </div>
              </div>
            )}
            {/* Create Playlist Modal */}
            <section
              className={`${
                showModal ? "block" : "hidden"
              } fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-50`}
            >
              <div className="flex flex-col items-center justify-center mt-32 sm:mt-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-2xl shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-300 scale-100">
                  <div className="p-8 space-y-6 relative">
                    <div
                      className="hover:bg-gray-100 hover:dark:bg-gray-700 transition-all duration-200 cursor-pointer rounded-full w-10 h-10 flex justify-center items-center absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => {
                        setShowModal(false);
                        setName("");
                        setDescription("");
                      }}
                    >
                      <svg
                        className="w-6 h-6"
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
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-2">
                        Create New Playlist
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Organize your favorite videos into a custom collection
                      </p>
                    </div>
                    <form className="space-y-6" action="#">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-3 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Playlist Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200"
                          placeholder="My Awesome Playlist"
                          required=""
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-3 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows="3"
                          placeholder="A collection of my favorite videos..."
                          className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 resize-none"
                          required=""
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm px-6 py-4 text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                      >
                        Create Playlist
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* No Playlists State */}
            {!loading && playlists.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-blue-500 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No playlists yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                  Create your first playlist to organize your favorite videos
                  into collections.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-4 h-4"
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
                  Create Your First Playlist
                </button>
              </div>
            )}

            {/* Playlists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1736px]:grid-cols-5 min-[2250px]:grid-cols-6 gap-6">
              {loading && <PlaylistLoader />}
              {playlists &&
                playlists.map((playlist, index) => (
                  <Playlist key={index} playlist={playlist} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
