import { Router } from "express";

import { AuthController } from "../controllers/auth_controller.js";
import { AuthService } from "../services/auth_service.js";
import { PrismaUserRepository } from "../repositories/prisma_user_repository.js";

import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/async_handler.js";

import { signupSchema,loginSchema} from "../zod_schemas/auth_schema.js";

const router = Router();

const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post(
    "/signup",
    validate(signupSchema),
    asyncHandler(authController.signup)
);

router.post(
    "/login",
    validate(loginSchema),
    asyncHandler(authController.login)
);

export default router;