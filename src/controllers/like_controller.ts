import { Request, Response } from "express";
import { LikeService } from "../services/like_service.js";

export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) { }

    likePost = async (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const userId = req.user!.userId;

        const like = await this.likeService.likePost(
            userId,
            postId
        );

        return res.status(201).json(like);
    };

    unlikePost = async (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const userId = req.user!.userId;

        await this.likeService.unlikePost(
            userId,
            postId
        );

        return res.status(204).send();
    };
}