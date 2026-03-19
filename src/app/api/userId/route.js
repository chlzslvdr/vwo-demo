import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET() {
  const cookieStore = await cookies();

  let userId = cookieStore.get("vwo_user_id")?.value;

  if (!userId) {
    userId = crypto.randomUUID();

    const response = NextResponse.json({ userId });

    response.cookies.set("vwo_user_id", userId, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  }

  return NextResponse.json({ userId });
}