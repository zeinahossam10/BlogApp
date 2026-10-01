import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app_error.js";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError(401, "Authentication required");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        throw new AppError(401, "Invalid authorization header");
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { userId: number };

        req.user = {
            userId: payload.userId
        };

        next();
    } catch {
        throw new AppError(401, "Invalid or expired token");
    }
};