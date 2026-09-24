import { Prisma, Comment } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma_client.js";
import { CommentRepository } from "./comment_repository.js";

export class PrismaCommentRepository implements CommentRepository {
    async create(
        content: string,
        userId: number,
        postId: number
    ): Promise<Comment> {
        return prisma.comment.create({
            data: {
                content,
                userId,
                postId
            }
        });
    }

    async findByPostId(
        postId: number
    ): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: { postId }
        });
    }

    async update(
        id: number,
        content: string
    ): Promise<Comment | null> {
        try {
            return await prisma.comment.update({
                where: { id },
                data: { content }
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                return null;
            }

            throw error;
        }
    }

    async delete(
        id: number
    ): Promise<boolean> {
        try {
            await prisma.comment.delete({
                where: { id }
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