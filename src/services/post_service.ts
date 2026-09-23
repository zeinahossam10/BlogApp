import { Post } from "../generated/prisma/client.js";
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

    async findPost(
        id: number
    ): Promise<Post | null> {
        return this.postRepository.findById(id);
    }

    async updatePost(
        id: number,
        title: string,
        content: string
    ): Promise<Post | null> {
        return this.postRepository.update(
            id,
            title,
            content
        );
    }

    async patchPost(
        id: number,
        title?: string,
        content?: string
    ): Promise<Post | null> {
        return this.postRepository.patch(
            id,
            title,
            content
        );
    }

    async deletePost(
        id: number
    ): Promise<boolean> {
        return this.postRepository.delete(id);
    }
}