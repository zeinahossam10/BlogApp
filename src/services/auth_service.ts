import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user_repository.js";
import { AppError } from "../errors/app_error.js";

export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async signup(
        email: string,
        password: string
    ) {
        const existingUser =
            await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError(
                409,
                "Email already registered"
            );
        }

        const passwordHash =
            await bcrypt.hash(password, 12);

        const user =
            await this.userRepository.create(
                email,
                passwordHash
            );

        return user;
    }

    async login(email: string, password: string) {
        const user =
            await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError(401, "Invalid credentials");
        }

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!passwordMatches) {
            throw new AppError(401, "Invalid credentials");
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
        );

        return token;
    }
}

