import { Video } from "../models/video.model.js";
import { Playlist } from "../models/playlist.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getChannelSubscribers = async (req, res) => {
    const currUserId = req.user._id;

    const subscribers = await Subscription.find({ channel: currUserId });

    if (!subscribers) {
        return res.status(500).json({
            message: "Something went wrong while fetching subscribers",
        });
    }

    const totalSubscribers = subscribers.length;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                totalSubscribers,
                "Subscribers fetched successfully"
            )
        );
};

const getChannelVideos = async (req, res) => {
    const videos = await Video.find({ owner: req.user._id });

    if (!videos) {
        return res
            .status(500)
            .json({ message: "Something went wrong while fetching videos" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos fetched successfully"));
};

const getChannelPlaylists = async (req, res) => {
    const playlists = await Playlist.find({ owner: req.user._id });

    if (!playlists) {
        return res
            .status(500)
            .json({ message: "Something went wrong while fetching playlists" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlists, "Playlists fetched successfully")
        );
};

export { getChannelSubscribers, getChannelVideos, getChannelPlaylists };
