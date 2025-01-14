import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../api";
import { useParams } from "react-router-dom";

const AddToPlaylistModal = ({ showModal, setShowModal }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${API}/playlist`);
        // console.log(response.data.data);
        setPlaylists(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async () => {
    // console.log(videoId, selectedPlaylist._id);
    try {
      await axios.patch(
        `${API}/playlist/add/${videoId}/${selectedPlaylist._id}`
      );
      setShowModal(false);
      setSelectedPlaylist(null);
      // console.log("Video added to playlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className={`${
        showModal ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-gray-900 dark:bg-slate-700 dark:bg-opacity-50 bg-opacity-50 z-10`}
    >
      <div className="flex flex-col mt-40 sm:mt-0 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
            <div
              className="hover:bg-gray-300 hover:dark:bg-gray-600 transition-all duration-50 cursor-pointer rounded-md text-xl w-5 flex justify-center items-center absolute top-4 right-4"
              onClick={() => {
                setShowModal(false);
                setSelectedPlaylist(null);
              }}
            >
              X
            </div>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Select Playlist
            </h1>
            <div action="">
              <ul
                className="w-full mt-4 overflow-y-auto max-h-60"
                style={{ scrollbarWidth: "thin" }}
              >
                {playlists?.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No playlists found
                  </p>
                )}
                {playlists &&
                  playlists.map((playlist) => (
                    <li
                      className={`cursor-pointer mb-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-50 rounded-md p-2 px-4`}
                      style={
                        selectedPlaylist &&
                        selectedPlaylist?._id === playlist?._id
                          ? {
                              backgroundColor: "#2563EB",
                              color: "white",
                            }
                          : {}
                      }
                      key={playlist?._id}
                      onClick={() => setSelectedPlaylist(playlist)}
                    >
                      {playlist.name}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddToPlaylistModal;
