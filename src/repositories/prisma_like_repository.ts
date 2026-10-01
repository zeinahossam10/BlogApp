import { Prisma, Like } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma_client.js";
import { LikeRepository } from "./like_repository.js";

export class PrismaLikeRepository implements LikeRepository {
    async create(
        userId: number,
        postId: number
    ): Promise<Like> {
        return prisma.like.create({
            data: {
                userId,
                postId
            }
        });
    }

    async delete(
        userId: number,
        postId: number
    ): Promise<boolean> {
        try {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                }
            });

            return true;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                return false;
            }

            throw error;
        }
    }
}