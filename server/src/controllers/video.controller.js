import { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    uploadOnCloudinary,
    deleteImageFromCloudinary,
    deleteVideoFromCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = async (req, res) => {
    console.log("Get all videos");
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // const videos = await Video.find({ status: "public" })
    //     .skip(skip)
    //     .limit(limit)
    //     .sort({ createdAt: -1 })
    //     .populate("owner");

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
            $skip: skip,
        },
        {
            $limit: limit,
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

    console.log(videoFileLocalPath);

    let thumbnailLocalPath;

    if (req.files.thumbnail) {
        thumbnailLocalPath = req.files.thumbnail[0].path;
    }

    console.log(thumbnailLocalPath);

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    console.log(videoFile);

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

    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(500).json({ message: "Video not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video found successfully"));
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

    console.log(thumbnailLocalPath);

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

    console.log(video);

    const videoOldLink = video.videoFile.split("/");
    const videoPublicId = videoOldLink[videoOldLink.length - 1].split(".")[0];
    console.log(videoPublicId);
    const deletedVideo = await deleteVideoFromCloudinary(videoPublicId);

    console.log(deletedVideo);

    const thumbnailOldLink = video.thumbnail.split("/");
    const thumbnailPublicId =
        thumbnailOldLink[thumbnailOldLink.length - 1].split(".")[0];
    console.log(thumbnailPublicId);
    await deleteFromCloudinary(thumbnailPublicId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"));
};

export { getAllVideos, publishAVideo, getVideoById, updateVideo, deleteVideo };
