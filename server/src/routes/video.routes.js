import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideosByUsername,
    getVideoById,
    publishAVideo,
    updateVideo,
    viewVideo,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    publishAVideo
);

router.route("/").get(getAllVideos);
router.route("/u/:username").get(getVideosByUsername);

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router.route("/view/:videoId").get(viewVideo);

export default router;
