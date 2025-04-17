import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
    Strategy as JwtStrategy,
    VerifiedCallback,
} from "passport-jwt";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Request } from "express";
import { db } from "./db";
import { verifyPassword, generateHash } from "#/utils/authutils";
import { env } from "#/utils/envutils";
import { getDecryptedToken } from "#/utils/jwtutils";
import { User } from "#/generated/prisma";

// Type for JWT payload
interface JwtPayload {
    sub: string;
    iat?: number;
    exp?: number;
}

// Extract JWT from cookies
const cookieExtractor = (req: Request): string | null => {
    let encryptedToken: string | null = null;
    if (req && req.cookies && req.cookies["jwt"]) {
        encryptedToken = (req.cookies["jwt"] as any).token || req.cookies["jwt"];
    }
    const token = encryptedToken ? getDecryptedToken(encryptedToken) : null;
    return token;
};

// JWT Strategy Options
const jwtOpts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: env.JWT_SECRET_KEY,
};

// Local strategy fields
const customFields = {
    usernameField: "identifier",
    passwordField: "password",
};

// Local strategy verify function
const verifyUser = async (
    username: string,
    password: string,
    done: (error: any, user?: User | boolean, options?: any) => void,
) => {
    try {
        if (!username || !password) {
            return done(null, false, {
                message: "Username and password are required.",
            });
        }
        
        const user = await db.user.findFirst({
            where: {
                OR: [{ username: username }, { email: username }],
            },
        });
        
        if (!user) {
            return done(null, false, { message: "Incorrect username or email." });
        }
        
        const isValid = verifyPassword(password, user.password_hash);
        if (!isValid) {
            return done(null, false, { message: "Incorrect password." });
        }
        
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
};

// JWT Strategy
passport.use(
    new JwtStrategy(
        jwtOpts,
        async (payload: JwtPayload, done: VerifiedCallback) => {
            if (!payload) {
                return done(null, false, { message: "Token is not present" });
            }
            
            return done(null, payload.sub);
        },
    ),
);

// Local Strategy
passport.use(new LocalStrategy(customFields, verifyUser));

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${env.SERVER_URL}/auth/google/callback`,
            passReqToCallback: true,
        },
        async (
            req: Request,
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            cb: (error: any, user?:User|boolean) => void,
        ) => {
            try {
                const email = profile._json.email;
                const username = profile.displayName;
                
                const user = await db.user.findFirst({
                    where: {
                        email: email,
                    },
                });
                
                if (user) {
                    if (user.isGoogleId) {
                        return cb(null, user);
                    } else {
                        return cb("Already manually logged in", false);
                    }
                }

                const hash = generateHash(profile.id);
                const newUser = await db.user.create({
                    data: {
                        username,
                        email,
                        userAvatar: profile._json.picture,
                        password_hash: hash,
                        isGoogleId: true,
                        googleId: profile.id,
                    },
                });

                return cb(null, newUser);
            } catch (error) {
                return cb(error, false);
            }
        },
    ),
);
