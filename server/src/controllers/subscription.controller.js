import { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleSubscription = async (req, res) => {
    const { channelId } = req.params;

    if (!channelId?.trim()) {
        return res.status(400).json({ message: "channel id is required" });
    }

    if (!isValidObjectId(channelId)) {
        return res.status(400).json({ message: "Not a valid Channel id" });
    }

    const isSubscribed = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id,
    });

    if (!isSubscribed) {
        const channelSubscribed = await Subscription.create({
            subscriber: req.user._id,
            channel: channelId,
        });

        const createdSubscription = await Subscription.findById(
            channelSubscribed._id
        );

        if (!createdSubscription) {
            return res
                .status(500)
                .json({ message: "Something went wrong while subscription" });
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, createdSubscription, "Channel Subscribed")
            );
    }

    const unsubscribed = await Subscription.findByIdAndDelete(isSubscribed._id);

    if (!unsubscribed) {
        return res.status(500).json({ message: "Error while unsubscribing" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Channel Unsubscribed"));
};

// controller to return subscriber list of a channel
const getUserChannelSubscribers = async (req, res) => {
    const { channelId } = req.params;

    if (!channelId?.trim()) {
        return res.status(400).json({ message: "channel id is required" });
    }

    if (!isValidObjectId(channelId)) {
        return res.status(400).json({ message: "Not a valid Channel id" });
    }

    const subscriberList = await Subscription.find({
        channel: channelId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscriberList,
                "Subscribers found successfully"
            )
        );
};

// controller to return channel list to which user has subscribed
const getSubscribedChannels = async (req, res) => {
    const { subscriberId } = req.params;

    if (!subscriberId?.trim()) {
        return res.status(400).json({ message: "subscriber id is required" });
    }

    if (!isValidObjectId(subscriberId)) {
        return res.status(400).json({ message: "Not a valid Subscriber id" });
    }

    const channelList = await Subscription.find({ subscriber: subscriberId });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                channelList,
                "Subscribed channels found successfully"
            )
        );
};

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
