import { Request, Response } from "express";
import { PostService } from "../services/post_service.js";

export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    createPost = async (
        req: Request,
        res: Response
    ) => {
        const {
            title,
            content,
            userId
        } = req.body;

        const post = await this.postService.createPost(
            title,
            content,
            userId
        );

        return res.status(201).json(post);
    };

    getPosts = async (
        req: Request,
        res: Response
    ) => {
        const posts = await this.postService.findAllPosts();

        return res.status(200).json(posts);
    };

    findPost = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const id = Number(req.params.id);

        const post = await this.postService.findPost(id);

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json(post);
    };

    updatePost = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const id = Number(req.params.id);
        const { title, content } = req.body;

        const post = await this.postService.updatePost(
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

    patchPost = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const id = Number(req.params.id);
        const { title, content } = req.body;

        const post = await this.postService.patchPost(
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

    deletePost = async (
        req: Request<{ id: string }>,
        res: Response
    ) => {
        const id = Number(req.params.id);

        const deleted = await this.postService.deletePost(id);

        if (!deleted) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(204).send();
    };
}