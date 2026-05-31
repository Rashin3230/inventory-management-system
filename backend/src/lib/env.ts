import path from "path";
import { config } from "dotenv";
import { z } from "zod";

config({ path: path.resolve(__dirname, "../../.env.local") });

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .startsWith("mongodb", "MONGODB_URI must be a valid MongoDB connection string"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const parsed = envSchema.safeParse({
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
    NODE_ENV: process.env.NODE_ENV ?? "development",
  });

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    const message = Object.entries(formatted)
      .map(([key, errors]) => `${key}: ${errors?.join(", ")}`)
      .join("; ");
    throw new Error(`Invalid environment variables: ${message}`);
  }

  return parsed.data;
}

export const env = getEnv();
