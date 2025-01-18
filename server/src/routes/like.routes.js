import { Router } from "express";
import {
    toggleVideoLike,
    getVideoLikes,
    getLikedVideos,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/v/:videoId").get(getVideoLikes);
router.route("/videos").get(getLikedVideos);

export default router;
