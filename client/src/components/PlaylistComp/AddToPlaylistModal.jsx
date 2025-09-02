import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddToPlaylistModal = ({ showModal, setShowModal }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const { videoId } = useParams();

  // Configure axios defaults for authentication
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!showModal) return;

      try {
        setLoading(true);
        const response = await axios.get(`${API}/playlist`, {
          withCredentials: true,
        });
        // console.log(response.data.data);
        setPlaylists(response.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [showModal]);

  const handleSubmit = async () => {
    if (!selectedPlaylist) {
      return toast.error("Please select a playlist");
    }

    try {
      setLoading(true);
      await axios.patch(
        `${API}/playlist/add/${videoId}/${selectedPlaylist._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setShowModal(false);
      setSelectedPlaylist(null);
      toast.success("Video added to playlist successfully!");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to add video to playlist";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPlaylist(null);
  };

  return (
    <section
      className={`${
        showModal ? "flex" : "hidden"
      } fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900/40 via-blue-900/50 to-emerald-900/60 backdrop-blur-sm z-50 items-center justify-center p-4 transition-all duration-300`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-lg mx-auto transform transition-all duration-300 ${
          showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-600 dark:to-emerald-600 p-6 text-white">
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 text-white hover:text-white group"
              onClick={handleClose}
            >
              <svg
                className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-200"
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
            <div className="pr-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Save to Playlist</h1>
                  <p className="text-white/80 text-sm">
                    Choose where to save this video
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Playlists Container */}
            <div className="space-y-1">
              <div
                className="w-full overflow-y-auto max-h-80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-slate-50/50 dark:bg-gray-800/50"
                style={{ scrollbarWidth: "thin" }}
              >
                {loading && (
                  <div className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700"></div>
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Loading playlists...
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                          Please wait a moment
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && playlists?.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-blue-500 dark:text-blue-400"
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
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          No playlists found
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                          Create your first playlist to get started!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!loading &&
                  playlists &&
                  playlists.map((playlist, index) => (
                    <div
                      className={`group cursor-pointer p-4 border-b border-gray-100/50 dark:border-gray-700/50 last:border-b-0 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-all duration-200 ${
                        selectedPlaylist &&
                        selectedPlaylist?._id === playlist?._id
                          ? "bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 border-l-4 border-l-blue-500"
                          : ""
                      }`}
                      key={playlist?._id}
                      onClick={() => setSelectedPlaylist(playlist)}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Custom Radio Button */}
                        <div className="relative">
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                              selectedPlaylist &&
                              selectedPlaylist?._id === playlist?._id
                                ? "border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/25"
                                : "border-gray-300 dark:border-gray-500 group-hover:border-blue-400"
                            }`}
                          >
                            {selectedPlaylist &&
                              selectedPlaylist?._id === playlist?._id && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                              )}
                          </div>
                        </div>

                        {/* Playlist Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {playlist.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-semibold truncate ${
                                  selectedPlaylist &&
                                  selectedPlaylist?._id === playlist?._id
                                    ? "text-blue-700 dark:text-blue-300"
                                    : "text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                {playlist.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {playlist.videos?.length || 0} videos
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {selectedPlaylist &&
                          selectedPlaylist?._id === playlist?._id && (
                            <div className="text-blue-500">
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
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <button
                type="button"
                className={`w-full font-semibold rounded-xl px-6 py-3 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  !selectedPlaylist || loading
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-blue-500/25"
                }`}
                onClick={handleSubmit}
                disabled={!selectedPlaylist || loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Adding to playlist...</span>
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add to Playlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddToPlaylistModal;
