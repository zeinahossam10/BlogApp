import { Router } from "express";

import { CommentController } from "../controllers/comment_controller.js";
import { CommentService } from "../services/comment_service.js";
import { PrismaCommentRepository } from "../repositories/prisma_comment_repository.js";

import { authenticate } from "../middleware/auth_middleware.js";
import { asyncHandler } from "../middleware/async_handler.js";
import { validate } from "../middleware/validate.js";

import {
    createCommentSchema,
    updateCommentSchema
} from "../zod_schemas/comment_schema.js";

const router = Router();

const commentRepository = new PrismaCommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

router.post(
    "/posts/:postId/comments",
    authenticate,
    validate(createCommentSchema),
    asyncHandler(commentController.createComment)
);

router.get(
    "/posts/:postId/comments",
    asyncHandler(commentController.getComments)
);

router.patch(
    "/comments/:id",
    authenticate,
    validate(updateCommentSchema),
    asyncHandler(commentController.updateComment)
);

router.delete(
    "/comments/:id",
    authenticate,
    asyncHandler(commentController.deleteComment)
);

export default router;