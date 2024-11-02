import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary URL
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary URL
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // cloudinary URL
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["public", "private"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
