import { string } from "zod";
import { Post } from "../entities/post.js";
import { PostRepository } from "./post_repository.js";

export class inmemory_post_repository implements PostRepository {
    private posts: Post[] = [];

    create(post: Post): Post {
        this.posts.push(post);

        return post;
    }

    findAll(): Post[] {
        return this.posts;
    }

    findById(id: string): Post | undefined {
        return this.posts.find(post => post.id === id);
    }

    update(
        id: string,
        title: string,
        content: string
    ): Post | undefined {
        const post = this.posts.find(post => post.id === id);

        if (!post) {
            return undefined;
        }

        post.title = title;
        post.content = content;

        return post;
    }

    patch(
        id: string,
        title?: string,
        content?: string
    ): Post | undefined {
        const post = this.posts.find(post => post.id === id);

        if (!post) {
            return undefined;
        }

        if (title !== undefined) {
            post.title = title;
        }

        if (content !== undefined) {
            post.content = content;
        }

        return post;
    }

    delete(
        id: string
    ): boolean {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            return false
        }
        this.posts = this.posts.filter(post => post.id !== id);
        return true
    }
}