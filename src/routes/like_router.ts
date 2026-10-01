import { Router } from "express";

import { LikeController } from "../controllers/like_controller.js";
import { LikeService } from "../services/like_service.js";
import { PrismaLikeRepository } from "../repositories/prisma_like_repository.js";

import { authenticate } from "../middleware/auth_middleware.js";
import { asyncHandler } from "../middleware/async_handler.js";

const router = Router();

const likeRepository = new PrismaLikeRepository();
const likeService = new LikeService(likeRepository);
const likeController = new LikeController(likeService);

router.post(
    "/posts/:postId/like",
    authenticate,
    asyncHandler(likeController.likePost)
);

router.delete(
    "/posts/:postId/like",
    authenticate,
    asyncHandler(likeController.unlikePost)
);

export default router;