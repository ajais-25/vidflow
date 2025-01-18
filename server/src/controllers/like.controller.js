import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleVideoLike = async (req, res) => {
    const { videoId } = req.params;

    if (!videoId?.trim()) {
        return res.status(400).json({ message: "video id is missing" });
    }

    if (!isValidObjectId(videoId)) {
        return res.status(400).json({ message: "Not a valid video id" });
    }

    const likedVideo = await Like.findOne({ video: videoId });

    if (!likedVideo) {
        const videoLiked = await Like.create({
            video: videoId,
            likedBy: req.user._id,
        });

        if (!videoLiked) {
            return res.status(500).json({ message: "Something went wrong" });
        }

        return res
            .status(200)
            .json(new ApiResponse(200, videoLiked, "Video Liked"));
    }

    const videoUnliked = await Like.findByIdAndDelete(likedVideo._id);

    if (!videoUnliked) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json(new ApiResponse(200, {}, "Video Unliked"));
};

const getVideoLikes = async (req, res) => {
    const { videoId } = req.params;

    const videoLikes = await Like.find({ video: videoId });
    const liked = await Like.findOne({
        video: videoId,
        likedBy: req.user._id,
    });

    let isLiked = false;
    if (liked) {
        isLiked = true;
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { videoLikes, isLiked },
                "Video likes fetched successfully"
            )
        );
};

const getLikedVideos = async (req, res) => {
    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video",
            },
        },
        {
            $unwind: "$video",
        },
        {
            $lookup: {
                from: "users",
                localField: "video.owner",
                foreignField: "_id",
                as: "video.owner",
            },
        },
        {
            $unwind: "$video.owner",
        },
        {
            $project: {
                _id: "$video._id",
                "video.title": 1,
                "video.views": 1,
                "video.thumbnail": 1,
                "video.createdAt": 1,
                "video.duration": 1,
                "video.owner.username": 1,
                "video.owner.fullName": 1,
                "video.owner.avatar": 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                likedVideos,
                "Liked videos fetched successfully"
            )
        );
};

export { toggleVideoLike, getVideoLikes, getLikedVideos };
