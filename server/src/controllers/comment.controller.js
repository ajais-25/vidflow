import { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getVideoComments = async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const comments = await Comment.find({ video: videoId })
        .skip(skip)
        .limit(limit);

    if (!comments) {
        return res
            .status(500)
            .json({ message: "Something went wrong while fetching comments" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments fetched Successfully"));
};

const addComment = async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!videoId?.trim()) {
        return res.status(400).json({ message: "video id is required" });
    }

    if (!isValidObjectId(videoId)) {
        return res.status(400).json({ message: "Not a valid video id" });
    }

    if (!content) {
        return res.status(400).json({ message: "content is required" });
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id,
    });

    if (!comment) {
        return res
            .status(500)
            .json({ message: "Something went wrong while creating comment" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment created successfully"));
};

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!commentId?.trim()) {
        return res.status(400).json({ message: "comment id is required" });
    }

    if (!isValidObjectId(commentId)) {
        return res.status(400).json({ message: "Not a valid comment id" });
    }

    if (!content) {
        return res.status(400).json({ message: "content is required" });
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        { $set: { content } },
        { new: true }
    );

    if (!comment) {
        return res
            .status(500)
            .json({ message: "Something went wrong while updating comment" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment updated successfully"));
};

const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    if (!commentId?.trim()) {
        return res.status(400).json({ message: "comment id is required" });
    }

    if (!isValidObjectId(commentId)) {
        return res.status(400).json({ message: "Not a valid comment id" });
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
        return res
            .status(500)
            .json({ message: "Something went wrong while deleting comment" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Comment deleted successfully"));
};

export { getVideoComments, addComment, updateComment, deleteComment };
