import { Request, Response, RequestHandler } from "express";
import { db } from "../config/db"; // Assuming you exported PrismaClient as `db`
import { generateHash } from "#/utils/authutils";
import { issueJWT } from "#/utils/jwtutils";
import { env } from "#/utils/envutils";
import { User } from "@prisma/client";
import { ApiError } from "#/utils/errorutils";
import { StatusCodes } from "http-status-codes";
import { SignupDto } from "#/dto/authDto";
const FALLBACK_URL = env.FALLBACK_URL;
const CLIENT_URL = env.CLIENT_URL;

class AuthController {
  private user: User | null = null;

  async register(req: Request, res: Response) {
    const isverified = SignupDto.safeParse(req.body);
    if (!isverified.success) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        req.url,
        "Data not parsed properly",
      );
    }
    const { username, email, password } = isverified.data;
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
        isGoogleId: false,
        password_hash: hash,
      },
    });
    if (!this.user) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        req.url,
        "Error in creating users",
      );
    }
    const { accessToken, refreshToken } = issueJWT(this.user!);
    const refreshTokenupdate = await db.user.update({
      data: {
        rt_hash: refreshToken,
      },
      where: {
        id: this.user.id,
      },
    });
    if (!refreshTokenupdate) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        req.url,
        "Error in creating User",
      );
    }
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).send({
      status: "success",
      message: "Account created Successfully",
      content: {
        accessToken,
      },
    });
  }

  logout: RequestHandler = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Successfully logged out" });
  };

  async GoogleCallBack(req: Request, res: Response) {
    if (req.user) {
      const { refreshToken, accessToken } = issueJWT(req.user as User);
      res.clearCookie("jwt");
      res.cookie("jwt", refreshToken, {
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
