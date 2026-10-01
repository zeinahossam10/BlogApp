import { Like } from "../generated/prisma/client.js";
import { AppError } from "../errors/app_error.js";
import { LikeRepository } from "../repositories/like_repository.js";
import { Prisma } from "../generated/prisma/client.js";

export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository
    ) { }

    async likePost(
        userId: number,
        postId: number
    ): Promise<Like> {
        try {
            return await this.likeRepository.create(
                userId,
                postId
            );
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new AppError(
                    409,
                    "Post already liked"
                );
            }

            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                throw new AppError(
                    404,
                    "Post not found"
                );
            }

            throw error;
        }
    }

    async unlikePost(
        userId: number,
        postId: number
    ): Promise<void> {
        const deleted =
            await this.likeRepository.delete(
                userId,
                postId
            );

        if (!deleted) {
            throw new AppError(
                404,
                "Like not found"
            );
        }
    }
}