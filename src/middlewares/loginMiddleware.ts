import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { issueJWT } from "#/utils/jwtutils";


// Extend Express.Request to add custom properties

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    passport.authenticate(
        "local",
        { session: false },
        (err: any, user: any, info: any) => {
            if (err) {
                console.error("error", err);
                return res.status(400).json({ message: info });
            }

            if (!user) {
                return res.status(400).json({ message: info });
            }

            if (user.isGoogleId) {
                return res
                    .status(403)
                    .json({ message: "You are already logged in using Google." });
            }

            const { token } = issueJWT(user);

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            });
            req.id = user.id;
            req.userDetails = {
                username: user.username,
                email: user.email,
            };
            return res.status(200).json({});
        },
    )(req, res, next);
};

export const jwt_authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    passport.authenticate("jwt", (error: any, user: any, info: any) => {
        if (error) {
            return res
                .status(500)
                .json({ message: info?.message || "Authentication failed" });
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid token" });
        }

        req.id = user.id;
        req.userDetails = {
            username: user.username,
            email: user.email,
        };

        req.isAdmin = user.email === "adminsl@gmail.com";

        next();
    })(req, res, next);
};
