import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "@/routes";
import { errorHandler } from "@/middleware/error.middleware";
import { env } from "@/lib/env";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler);

export default app;
