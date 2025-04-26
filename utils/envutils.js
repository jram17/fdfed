const dotenv = require('dotenv');
const path = require('path');

// Load env file
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // adjust path if needed

// Helper function to get ENV or throw error if missing
function getEnv(key, required = true) {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
}

// Environment variables object
const env = {
  NODE_ENV: getEnv('NODE_ENV'),
  PORT: getEnv('PORT'),
  
  MONGO_URI: getEnv('MONGO_URI'),

  JWT_SECRET_KEY: getEnv('JWT_SECRET_KEY'),
  CRYPTO_SECRET_KEY: getEnv('CRYPTO_SECRET_KEY'),

  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),

  SERVER_URL: getEnv('SERVER_URL'),
  CLIENT_URL: getEnv('CLIENT_URL'),
  FALLBACK_URL: getEnv('FALLBACK_URL'),

  RAZORPAY_KEY_ID: getEnv('RAZORPAY_KEY_ID'),
  RAZORPAY_SECRET_KEY: getEnv('RAZORPAY_SECRET_KEY'),

  RESEND_API: getEnv('RESEND_API'),

  REDIS_HOST: getEnv('REDIS_HOST'),
  REDIS_PORT: getEnv('REDIS_PORT'),
  REDIS_PASSWORD: getEnv('REDIS_PASSWORD'),

  ADMIN_EMAIL: getEnv('ADMIN_EMAIL'),

  // optional example:
  OPTIONAL_VAR: getEnv('OPTIONAL_VAR', false) || 'defaultValue',
};

module.exports = env;

