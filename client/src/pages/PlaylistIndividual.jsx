import React, { useEffect, useState } from "react";
import LeftPart from "../components/PlaylistComp/LeftPart";
import RightPart from "../components/PlaylistComp/RightPart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

const PlaylistIndividual = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);

  const getPlaylist = async () => {
    try {
      const response = await axios.get(`${API}/playlist/${playlistId}`);
      // console.log(response.data.data);
      setPlaylist(response.data.data);
      setVideos(response.data.data.videos);
      // console.log(response.data.data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 px-4 py-20 text-gray-900 relative dark:text-gray-100">
      <div className="flex flex-col sm:flex-col">
        {playlist && videos && (
          <>
            <LeftPart playlistInfo={playlist} />
            <RightPart videos={videos} />
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistIndividual;
