import { Request, Response, RequestHandler } from "express";
import { db } from "../config/db"; // Assuming you exported PrismaClient as `db`
import { generateHash } from "#/utils/authutils";
import { issueJWT } from "#/utils/jwtutils";
import { env } from "#/utils/envutils";
import { User } from "#/generated/prisma";
import { ApiError } from "#/utils/errorutils";
import { StatusCodes } from "http-status-codes";

const FALLBACK_URL = env.FALLBACK_URL;
const CLIENT_URL = env.CLIENT_URL;

class AuthController {
    private user: User | null = null;

    async register(req: Request, res: Response) {
        const { username, email, password } = req.body;

        this.user = await db.user.findFirst({
            where: {
                OR: [{ username: username }, { email: email }],
            },
        });

        if (this.user) {
            throw new ApiError(StatusCodes.CONFLICT, req.url, "User already exists");
        }

        const { hash } = generateHash(password);

        this.user = await db.user.create({
            data: {
                username,
                email,
                password_hash: hash,
                isGoogleId: false,
            },
        });
        if (!this.user) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                req.url,
                "Error in creating users",
            );
        }
        const { token } = issueJWT(this.user!);

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.status(200).send({
            username: this.user.username,
            email: this.user.email,
            id: this.user.id
        });
    }

    logout: RequestHandler = async (req, res) => {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Successfully logged out" });
    };

    async GoogleCallBack(req: Request, res: Response) {
        if (req.user) {
            const { token } = issueJWT(req.user as User);
            res.clearCookie("jwt");
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.redirect(CLIENT_URL);
        } else {
            res.redirect(FALLBACK_URL);
        }
    }
}

export default AuthController;
