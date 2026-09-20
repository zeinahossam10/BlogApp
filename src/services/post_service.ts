import { randomUUID } from "crypto";
import { Post } from "../entities/post.js";
import { PostRepository } from "../repositories/post_repository.js";
import { string } from "zod";

export class PostService {
    constructor(private readonly postRepository: PostRepository) { }

    createPost(title: string, content: string): Post {
        const post: Post = {
            id: randomUUID(),
            title,
            content,
            createdAt: new Date(),
        };

        return this.postRepository.create(post);
    }

    findAllPosts(): Post[] {
        return this.postRepository.findAll();
    }

    findPost(id: string): Post | undefined {
        return this.postRepository.findById(id)
    }

    updatePost(
        id: string,
        title: string,
        content: string
    ): Post | undefined {
        return this.postRepository.update(id, title, content);
    }

    patchPost(
        id: string,
        title: string,
        content: string
    ): Post | undefined {
        return this.postRepository.patch(id, title, content);
    }

    deletePost(
        id:string
    ): boolean {
        return this.postRepository.delete(id);
    }
}