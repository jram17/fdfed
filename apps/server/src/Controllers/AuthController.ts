import { Request, Response } from "express";
import { db } from "../config/db"; // Assuming you exported PrismaClient as `db`
import { generateHash } from "#/utils/authutils";
import { issueJWT } from "#/utils/jwtutils";
import { env } from "#/utils/envutils";
import { v4 as uuidv4 } from "uuid";
import { User } from "#/generated/prisma";
import { ApiError } from "#/utils/errorutils";
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
                new ApiError( 'User already exists')
            }

            const { hash } = generateHash(password);
            const uuid = uuidv4();

            this.user = await db.user.create({
                data: {
                    username,
                    email,
                    uuid,
                    password_hash: hash,
                    userAvatar: "",
                    isGoogleId: false,
                },
            });


            const { token } = issueJWT(this.user!);

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.status(200).send({
                username: this.user.username,
                email: this.user.email,
                uuid: this.user.uuid,
            });
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "Successfully logged out" });
    }

    async GoogleCallBack(req: Request, res: Response) {
        try {
            if (req.user) {
                const { token } = issueJWT(req.user);

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
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Authentication failed." });
        }
    }
}

export default AuthController;
