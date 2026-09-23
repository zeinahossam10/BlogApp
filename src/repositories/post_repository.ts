import { Post } from "../generated/prisma/client.js";

export interface PostRepository {
    create(
        title: string,
        content: string,
        userId: number
    ): Promise<Post>;

    findAll(): Promise<Post[]>;

    findById(
        id: number
    ): Promise<Post | null>;

    update(
        id: number,
        title: string,
        content: string
    ): Promise<Post | null>;

    patch(
        id: number,
        title?: string,
        content?: string
    ): Promise<Post | null>;

    delete(
        id: number
    ): Promise<boolean>;
}