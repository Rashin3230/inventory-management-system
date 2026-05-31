import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "Inventory Management System API is healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
