import { Request, Response } from "express";
import { CommentService } from "../services/comment_service.js";

export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    createComment = async (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const { content } = req.body;
        const userId = req.user!.userId;

        const comment = await this.commentService.createComment(
            content,
            userId,
            postId
        );

        return res.status(201).json(comment);
    };

    getComments = async (req: Request, res: Response) => {
        const postId = Number(req.params.postId);

        const comments =
            await this.commentService.findCommentsByPost(postId);

        return res.status(200).json(comments);
    };

    updateComment = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { content } = req.body;

        const comment =
            await this.commentService.updateComment(id, content);

        return res.status(200).json(comment);
    };

    deleteComment = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        await this.commentService.deleteComment(id);

        return res.status(204).send();
    };
}