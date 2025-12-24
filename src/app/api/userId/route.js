import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const userId = crypto.randomUUID();

  const res = NextResponse.json({ userId });
  res.cookies.set("vwo_user_id", userId, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
