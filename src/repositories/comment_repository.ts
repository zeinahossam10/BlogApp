import { Comment } from "../generated/prisma/client.js";

export interface CommentRepository {
    create(
        content: string,
        userId: number,
        postId: number
    ): Promise<Comment>;

    findByPostId(postId: number): Promise<Comment[]>;

    update(
        id: number,
        content: string
    ): Promise<Comment | null>;

    delete(id: number): Promise<boolean>;
}