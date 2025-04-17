import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { env } from "./envutils";
import { User } from "@prisma/client";
const PRIV_KEY = env.JWT_SECRET_KEY;
const AES_KEY = env.CRYPTO_SECRET_KEY;

interface JwtPayload {
    sub: {
        id: string;
        email: string;
        username: string;
        role: string;
    };
    iat: number;
}

interface TokenResult {
    token: string;
    expires: string;
}

export function issueJWT(user: User): TokenResult {
    const expiresIn = "1d";

    const payload: JwtPayload = {
        sub: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        },
        iat: Date.now(),
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn });
    const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(signedToken),
        AES_KEY,
    ).toString();

    return {
        token: encryptedToken,
        expires: expiresIn,
    };
}

export function getDecryptedToken(encryptedToken: string): string | null {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, AES_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    } catch (err) {
        console.error("Failed to decrypt token:", err);
        return null;
    }
}
