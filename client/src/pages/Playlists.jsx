// src/pages/PlaylistPage.jsx
import React, { useState } from "react";
import Playlist from "../components/playlist/Playlist";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([
    "Playlist 1",
    "Playlist 2",
    "Playlist 3",
    "Playlist 4",
    "Playlist 5",
    "Playlist 6",
    "Playlist 7",
    "Playlist 8",
  ]);
  const [newPlaylist, setNewPlaylist] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylist.trim()) {
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylist("");
    }
  };

  return (
    <div className="w-full min-h-screen dark:bg-gray-900 py-24 px-10 flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Your Playlists
        </p>
        <button
          onClick={handleCreatePlaylist}
          className="h-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-800"
        >
          Create
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
        {playlists.map((title, index) => (
          <Playlist key={index} title={title} />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
