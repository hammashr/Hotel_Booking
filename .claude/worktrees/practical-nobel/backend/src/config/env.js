const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('5000')
    .transform((value) => Number(value))
    .pipe(z.number().int().min(1).max(65535)),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  CORS_ORIGINS: z
    .string()
    .default('https://tinyescape.vercel.app,http://localhost:5173'),
  SQUARE_ACCESS_TOKEN: z.string().optional().default(''),
  SQUARE_LOCATION_ID: z.string().optional().default(''),
  SQUARE_WEBHOOK_SIGNATURE_KEY: z.string().optional().default(''),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formattedErrors = parsed.error.issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('\n');

  throw new Error(`Environment validation failed:\n${formattedErrors}`);
}

const env = parsed.data;

module.exports = { env };
