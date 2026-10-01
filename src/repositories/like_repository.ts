import { Like } from "../generated/prisma/client.js";

export interface LikeRepository {
    create(userId: number, postId: number): Promise<Like>;

    delete(userId: number, postId: number): Promise<boolean>;
}