import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            invalidate: true,
        });
        // file uploaded successfully
        fs.unlinkSync(localFilePath);
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the localy saved temporary file
        return null;
    }
};

const deleteImageFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;

        // delete file from cloudinary
        const res = await cloudinary.api.delete_resources([`${publicId}`], {
            resource_type: "image",
            invalidate: true,
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteVideoFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;

        // delete file from cloudinary
        const res = await cloudinary.api.delete_resources([`${publicId}`], {
            resource_type: "video",
            invalidate: true,
        });
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export {
    uploadOnCloudinary,
    deleteImageFromCloudinary,
    deleteVideoFromCloudinary,
};
