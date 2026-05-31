import type { Request, Response, NextFunction } from "express";

import { AppError } from "@/lib/api/response";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof Error) {
    console.error("[API Error]", error.message);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
