import { Comment } from "../generated/prisma/client.js";
import { AppError } from "../errors/app_error.js";
import { CommentRepository } from "../repositories/comment_repository.js";

export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository
    ) { }

    async createComment(
        content: string,
        userId: number,
        postId: number
    ): Promise<Comment> {
        return this.commentRepository.create(
            content,
            userId,
            postId
        );
    }

    async findCommentsByPost(
        postId: number
    ): Promise<Comment[]> {
        return this.commentRepository.findByPostId(postId);
    }

    async updateComment(
        id: number,
        content: string
    ): Promise<Comment> {
        const comment =
            await this.commentRepository.update(id, content);

        if (!comment) {
            throw new AppError(404, "Comment not found");
        }

        return comment;
    }

    async deleteComment(id: number): Promise<void> {
        const deleted =
            await this.commentRepository.delete(id);

        if (!deleted) {
            throw new AppError(404, "Comment not found");
        }
    }
}