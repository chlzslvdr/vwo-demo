
"use server";

import { cookies } from "next/headers";
import crypto from "crypto";

export async function createUserId() {
  const cookieStore = cookies();
  const userId = crypto.randomUUID();

  cookieStore.set("vwo_user_id", userId, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });

  return userId;
}
