import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET_KEY: z.string(),
  JWT_ACCESS_TOKEN_SECRET_KEY: z.string(),
  NODE_ENV: z.enum(["DEVELOPMENT", "PRODUCTION", "TEST"]),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  PORT: z.string().transform(Number),
  CRYPTO_SECRET_KEY: z.string(),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_SECRET_KEY: z.string(),
  SERVER_URL: z.string(),
  CLIENT_URL: z.string(),
  FALLBACK_URL: z.string(),

  // 👉 Redis environment variables
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  REDIS_PASSWORD: z.string().optional(), // in case it's optional
});
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
