import { Router } from "express";

import { PostController } from "../controllers/post_controller.js";
import { PostService } from "../services/post_service.js";
import { PrismaPostRepository } from "../repositories/prisma_post_repository.js";

import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/async_handler.js";
import { authenticate } from "../middleware/auth_middleware.js";

import {
  createPostSchema,
  updatePostSchema,
  patchPostSchema
} from "../zod_schemas/post_schema.js";

const router = Router();

const postRepository = new PrismaPostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.post(
  "/",
  authenticate,
  validate(createPostSchema),
  asyncHandler(postController.createPost)
);

router.get(
  "/",
  asyncHandler(postController.getPosts)
);

router.get(
  "/:id",
  asyncHandler(postController.findPost)
);

router.put(
  "/:id",
  authenticate,
  validate(updatePostSchema),
  asyncHandler(postController.updatePost)
);

router.patch(
  "/:id",
  authenticate,
  validate(patchPostSchema),
  asyncHandler(postController.patchPost)
);

router.delete(
  "/:id",
  authenticate,
  asyncHandler(postController.deletePost)
);

export default router