import { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    uploadOnCloudinary,
    deleteImageFromCloudinary,
    deleteVideoFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getAllVideos = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const videos = await Video.aggregate([
        {
            $match: {
                status: "public",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $unwind: "$owner",
        },
        {
            $project: {
                "owner.password": 0,
                "owner.email": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
                "owner.__v": 0,
                "owner.refreshToken": 0,
                "owner.watchHistory": 0,
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ]);

    if (!videos) {
        return res
            .status(500)
            .json({ message: "Something went wrong while fetching videos" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos fetched Successfully"));
};

const getVideosByUsername = async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        return res.status(500).json({ message: "username is missing" });
    }

    const videos = await Video.aggregate([
        {
            $match: {
                status: "public",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $unwind: "$owner",
        },
        {
            $match: {
                "owner.username": username,
            },
        },
        {
            $project: {
                "owner.password": 0,
                "owner.email": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
                "owner.__v": 0,
                "owner.refreshToken": 0,
                "owner.watchHistory": 0,
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);

    if (!videos) {
        return res
            .status(500)
            .json({ message: "Something went wrong while fetching videos" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos fetched Successfully"));
};

const publishAVideo = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(500).json({ message: "All fields are required" });
    }

    let videoFileLocalPath;

    if (req.files.videoFile) {
        videoFileLocalPath = req.files.videoFile[0].path;
    }

    let thumbnailLocalPath;

    if (req.files.thumbnail) {
        thumbnailLocalPath = req.files.thumbnail[0].path;
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoFile || !thumbnail) {
        return res
            .status(500)
            .json({ message: "Video file or thumbnail is required" });
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration: videoFile.duration,
        owner: req.user?._id,
        status,
    });

    const createdVideo = await Video.findById(video._id).select(
        "-views -status"
    );

    if (!createdVideo) {
        return res
            .status(500)
            .json({ message: "Something went wrong while creating a video" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdVideo, "Video created successfully"));
};

const getVideoById = async (req, res) => {
    const { videoId } = req.params;

    if (!videoId?.trim()) {
        return res.status(500).json({ message: "video id is missing" });
    }

    if (!isValidObjectId(videoId)) {
        return res.status(500).json({ message: "Not a valid video id" });
    }

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "owner._id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $unwind: "$owner",
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers",
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                "owner.password": 0,
                "owner.email": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
                "owner.__v": 0,
                "owner.refreshToken": 0,
                "owner.watchHistory": 0,
            },
        },
    ]);

    if (!video) {
        return res.status(500).json({ message: "Video not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video[0], "Video found successfully"));
};

const updateVideo = async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!videoId?.trim()) {
        return res.status(500).json({ message: "video id is missing" });
    }

    if (!isValidObjectId(videoId)) {
        return res.status(500).json({ message: "Not a valid video id" });
    }

    if (!title || !description) {
        return res
            .status(500)
            .json({ message: "title or description is required" });
    }

    let thumbnailLocalPath;

    if (req.file) {
        thumbnailLocalPath = req.file.path;
    }

    if (!thumbnailLocalPath) {
        return res.status(500).json({ message: "thumbnail file is required" });
    }

    const video = await Video.findById(videoId);

    const oldLink = video.thumbnail.split("/");
    const publicId = oldLink[oldLink.length - 1].split(".")[0];
    console.log(publicId);
    await deleteImageFromCloudinary(publicId);

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!thumbnail.url) {
        return res
            .status(500)
            .json({ message: "Error while uploading thumbnail" });
    }

    video.title = title;
    video.description = description;
    video.thumbnail = thumbnail.url;
    await video.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video updated successfully"));
};

const deleteVideo = async (req, res) => {
    const { videoId } = req.params;

    if (!videoId?.trim()) {
        return res.status(400).json({ message: "video id is missing" });
    }

    if (!isValidObjectId(videoId)) {
        return res.status(400).json({ message: "Not a valid video id" });
    }

    const video = await Video.findByIdAndDelete(videoId);

    const videoOldLink = video.videoFile.split("/");
    const videoPublicId = videoOldLink[videoOldLink.length - 1].split(".")[0];
    await deleteVideoFromCloudinary(videoPublicId);

    const thumbnailOldLink = video.thumbnail.split("/");
    const thumbnailPublicId =
        thumbnailOldLink[thumbnailOldLink.length - 1].split(".")[0];
    await deleteImageFromCloudinary(thumbnailPublicId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"));
};

const viewVideo = async (req, res) => {
    const { videoId } = req.params;

    if (!videoId?.trim()) {
        return res.status(400).json({ message: "video id is missing" });
    }

    if (!isValidObjectId(videoId)) {
        return res.status(400).json({ message: "Not a valid video id" });
    }

    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(400).json({ message: "Video not found" });
    }

    video.views += 1;
    await video.save({ validateBeforeSave: false });
    if (req.user.watchHistory.includes(video._id)) {
        req.user.watchHistory.pull(video._id);
    }
    req.user.watchHistory.push(video._id);
    await req.user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video viewed successfully"));
};

export {
    getAllVideos,
    getVideosByUsername,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    viewVideo,
};
