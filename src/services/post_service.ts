import { Post } from "../generated/prisma/client.js";
import { AppError } from "../errors/app_error.js";
import { PostRepository } from "../repositories/post_repository.js";

export class PostService {
    constructor(
        private readonly postRepository: PostRepository
    ) { }

    async createPost(
        title: string,
        content: string,
        userId: number
    ): Promise<Post> {
        return this.postRepository.create(
            title,
            content,
            userId
        );
    }

    async findAllPosts(): Promise<Post[]> {
        return this.postRepository.findAll();
    }

    async findPost(id: number): Promise<Post> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new AppError(404, "Post not found");
        }

        return post;
    }

    async updatePost(
        id: number,
        title: string,
        content: string,
        userId: number
    ): Promise<Post> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new AppError(404, "Post not found");
        }

        if (post.userId !== userId) {
            throw new AppError(
                403,
                "You do not have permission to modify this post"
            );
        }

        const updatedPost = await this.postRepository.update(
            id,
            title,
            content
        );

        return updatedPost!;
    }

    async patchPost(
        id: number,
        title: string | undefined,
        content: string | undefined,
        userId: number
    ): Promise<Post> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new AppError(404, "Post not found");
        }

        if (post.userId !== userId) {
            throw new AppError(
                403,
                "You do not have permission to modify this post"
            );
        }

        const updatedPost = await this.postRepository.patch(
            id,
            title,
            content
        );

        return updatedPost!;
    }

    async deletePost(
        id: number,
        userId: number
    ): Promise<void> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new AppError(404, "Post not found");
        }

        if (post.userId !== userId) {
            throw new AppError(
                403,
                "You do not have permission to delete this post"
            );
        }

        await this.postRepository.delete(id);
    }
}