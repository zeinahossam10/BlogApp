import { Request, Response } from "express";
import { PostService } from "../services/post_service.js";

export class PostController {
    constructor(private readonly postService: PostService) { }

    createPost = (req: Request, res: Response) => {
        const { title, content } = req.body;

        const post = this.postService.createPost(title, content);

        return res.status(201).json(post);
    };

    getPosts = (req: Request, res: Response) => {
        const posts = this.postService.findAllPosts();

        return res.status(200).json(posts);
    };

    findPost = (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params
        const post = this.postService.findPost(id);

        return res.status(200).json(post)
    }

    updatePost = (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = this.postService.updatePost(
            id,
            title,
            content
        );

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json(post);
    };

    patchPost = (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = this.postService.patchPost(
            id,
            title,
            content
        );

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json(post);
    };

    deletePost = (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const { id } = req.params;
        const deleted = this.postService.deletePost(id);
        if (!deleted) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(204).send();
    };
}