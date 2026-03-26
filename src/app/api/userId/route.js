import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  let existingUserId;

  cookieHeader.split(";").forEach((c) => {
    const [name, value] = c.trim().split("=");
    if (name === "vwo_user_id") existingUserId = value;
  });

  const userId = existingUserId || crypto.randomUUID();

  const response = NextResponse.json({ userId });

  if (!existingUserId) {
    response.cookies.set({
      name: "vwo_user_id",
      value: userId,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}