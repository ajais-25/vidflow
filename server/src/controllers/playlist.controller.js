import { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPlaylist = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res
            .status(400)
            .json({ message: "Name and description are required" });
    }

    const playlist = await Playlist.create({
        name,
        description,
        videos: [],
        owner: req.user._id,
    });

    const createdPlaylist = await Playlist.findById(playlist._id);

    if (!createdPlaylist) {
        return res
            .status(500)
            .json({ message: "Something went wrong while creating playlist" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdPlaylist,
                "Playlist created successfully"
            )
        );
};

const getUserPlaylists = async (req, res) => {
    const { userId } = req.params;

    if (!userId?.trim()) {
        return res.status(400).json({ message: "user id is missing" });
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Not a valid user id" });
    }

    const userPlaylists = await Playlist.find({ owner: userId });

    if (!userPlaylists) {
        return res.status(500).json({ message: "No playlists found" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userPlaylists,
                "Playlists fetched successfully"
            )
        );
};

const getPlaylistById = async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId?.trim()) {
        return res.status(400).json({ message: "Playlist id is missing" });
    }

    if (!isValidObjectId(playlistId)) {
        return res.status(400).json({ message: "Not a valid playlist id" });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist found successfully"));
};

const addVideoToPlaylist = async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!playlistId?.trim() || !videoId?.trim()) {
        return res
            .status(400)
            .json({ message: "Playlist or Video id is missing" });
    }

    if (!isValidObjectId(videoId) || !isValidObjectId(playlistId)) {
        return res.status(400).json({ message: "Not a valid id" });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.videos = playlist.videos.push(videoId);
    await playlist.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video added successfully"));
};

const removeVideoFromPlaylist = async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!playlistId?.trim() || !videoId?.trim()) {
        return res
            .status(400)
            .json({ message: "Playlist or Video id is missing" });
    }

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        return res.status(400).json({ message: "Not a valid id" });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.videos = playlist.videos.pull(videoId);
    await playlist.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video removed successfully"));
};

const deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId?.trim()) {
        return res.status(400).json({ message: "Playlist id is missing" });
    }

    if (!isValidObjectId(playlistId)) {
        return res.status(400).json({ message: "Not a valid playlist id" });
    }

    const deletedPlaylist = await Playlist.deleteOne({ _id: playlistId });

    console.log(deletedPlaylist);

    if (deletedPlaylist.deletedCount !== 1) {
        return res.status(500).json({ message: "Playlist not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
};

const updatePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    if (!playlistId?.trim()) {
        return res.status(400).json({ message: "Playlist id is missing" });
    }

    if (!isValidObjectId(playlistId)) {
        return res.status(400).json({ message: "Not a valid playlist id" });
    }

    if (!name || !description) {
        return res
            .status(400)
            .json({ message: "Name and description are required" });
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: { name, description },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Playlist updated successfully"
            )
        );
};

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
