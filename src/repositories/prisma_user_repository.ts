import { User } from "../generated/prisma/client.js";
import prisma from "../prisma/prisma_client.js";
import { UserRepository } from "./user_repository.js";

export class PrismaUserRepository implements UserRepository {

    async create(
        email: string,
        passwordHash: string
    ): Promise<User> {
        return prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });
    }

    async findByEmail(
        email: string
    ): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }
}