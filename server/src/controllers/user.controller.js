import { User } from "../models/user.model.js";
import {
    deleteImageFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message:
                "Something went wrong while genrating refresh and access token",
        });
    }
};

const registerUser = async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    let avatarLocalPath;

    if (req.files.avatar) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        return res
            .status(500)
            .json({ message: "Something went wrong while uploading Avatar" });
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        username,
        password,
    });

    const createdUser = await User.find(
        { _id: user._id },
        { password: 0, refreshToken: 0 }
    );

    if (!createdUser) {
        return res
            .status(500)
            .json({ message: "Something went wrong while creating user" });
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "email or password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User does not exists" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid user Credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.find(
        { _id: user._id },
        { password: 0, refreshToken: 0 }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser[0],
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
};

const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }, // this removes the field from the document
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
};

const refreshAccessToken = async (req, res) => {
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(404).json({ message: "Invalid refresh token" });
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            return res
                .status(401)
                .json({ message: "Refresh token is expired or used" });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};

const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
};

const getCurrentUser = async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
};

const updateAccountDetails = async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { fullName, email },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User updated successfully"));
};

const updateUserAvatar = async (req, res) => {
    let avatarLocalPath;

    if (req.file) {
        avatarLocalPath = req.file.path;
    }

    if (!avatarLocalPath) {
        return res.status(400).json({ message: "Avatar file is required" });
    }

    if (req.user.avatar) {
        const oldLink = req.user.avatar.split("/");
        const publicId = oldLink[oldLink.length - 1].split(".")[0];
        console.log(publicId);
        await deleteImageFromCloudinary(publicId);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        return res
            .status(500)
            .json({ message: "Error while uploading avatar" });
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { avatar: avatar.url },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, avatar.url, "Avatar updated successfully"));
};

const getUserChannelProfile = async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        return res.status(400).json({ message: "User id is missing" });
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase(),
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            },
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers",
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo",
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
                fullName: 1,
                username: 1,
                avatar: 1,
                coverImage: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
            },
        },
    ]);

    if (channel.length === 0) {
        return res.status(404).json({ message: "Channel not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, channel[0], "Channel fetched successfully"));
};

const getWatchHistory = async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner",
                            },
                        },
                    },
                ],
            },
        },
    ]);

    // reverse the watch history to show the latest watched video first
    user[0].watchHistory = user[0].watchHistory.reverse();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user[0].watchHistory,
                "Watch history fetched successfully"
            )
        );
};

const clearWatchHistory = async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.user._id },
            { $set: { watchHistory: [] } }
        );
        return res
            .status(200)
            .json(
                new ApiResponse(200, null, "Watch history cleared successfully")
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Failed to clear watch history"));
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    getUserChannelProfile,
    getWatchHistory,
    clearWatchHistory,
};
