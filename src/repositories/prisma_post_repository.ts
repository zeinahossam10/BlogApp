import { Post } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma_client.js";
import { PostRepository } from "./post_repository.js";
import { Prisma } from "../generated/prisma/client.js";

export class PrismaPostRepository implements PostRepository {

    async create(
        title: string,
        content: string,
        userId: number
    ): Promise<Post> {

        return prisma.post.create({
            data: {
                title,
                content,
                userId,
            },
        });
    }

    async findAll(): Promise<Post[]> {

        return prisma.post.findMany();
    }

    async findById(
        id: number
    ): Promise<Post | null> {

        return prisma.post.findUnique({
            where: {
                id,
            },
        });
    }

    async update(
        id: number,
        title: string,
        content: string
    ): Promise<Post | null> {
        try {
            return await prisma.post.update({
                where: { id },
                data: { title, content },
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

    async patch(
        id: number,
        title?: string,
        content?: string
    ): Promise<Post | null> {
        try {
            return await prisma.post.update({
                where: { id },
                data: {
                    ...(title !== undefined && { title }),
                    ...(content !== undefined && { content }),
                },
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

    async delete(id: number): Promise<boolean> {
        try {
            await prisma.post.delete({
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