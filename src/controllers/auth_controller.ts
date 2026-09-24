import { Request, Response } from "express";
import { AuthService } from "../services/auth_service.js";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    signup = async (
        req: Request,
        res: Response
    ) => {
        const { email, password } = req.body;

        const user = await this.authService.signup(
            email,
            password
        );

        return res.status(201).json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt
        });
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const token = await this.authService.login(
            email,
            password
        );

        return res.status(200).json({
            token
        });
    };
}