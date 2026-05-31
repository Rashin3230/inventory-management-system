import { NextResponse } from "next/server";

import type { ApiResponse } from "@/types";

export function apiSuccess<T>(
  data: T,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(
  message: string,
  status = 400,
): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, message }, { status });
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = 400,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  if (error instanceof AppError) {
    return apiError(error.message, error.statusCode);
  }

  if (error instanceof Error) {
    console.error("[API Error]", error.message);
    return apiError("Internal server error", 500);
  }

  return apiError("Internal server error", 500);
}
