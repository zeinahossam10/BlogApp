import { Router } from "express";
import { PostController } from "../controllers/post_controller.js";
import { PostService } from "../services/post_service.js";
import { inmemory_post_repository } from "../repositories/inmemory_post_repository.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema } from "../schemas/post_schema.js";
import { updatePostSchema } from "../schemas/post_schema.js";
import { patchPostSchema } from "../schemas/post_schema.js";
const router = Router();

const postRepository = new inmemory_post_repository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.post(
  "/",
  validate(createPostSchema),
  postController.createPost
);

router.get(
  "/",
  postController.getPosts
);

router.get(
    "/:id",postController.findPost
)

router.put(
    "/:id",
    validate(updatePostSchema),
    postController.updatePost
)

router.patch(
  "/:id",
  validate(patchPostSchema),
  postController.patchPost
)

router.delete(
  "/:id",postController.deletePost
)
export default router;