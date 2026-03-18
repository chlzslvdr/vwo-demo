export const dynamic = "force-dynamic";

import HomeClient from "./HomeClient";
import { newCTAExperience } from "@/flags/newCTAExperience";
import { cookies } from "next/headers";
import crypto from "crypto";

export default async function Page() {
  // ---------------------------
  // 1️⃣ Get or generate a stable user ID (server-side)
  // ---------------------------
  let userId;
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("vwo_user_id");
    userId = cookie?.value ?? crypto.randomUUID();
  } catch (err) {
    console.warn("Error reading cookies, generating fallback userId:", err);
    userId = crypto.randomUUID();
  }

  // Optional: fallback to /api/userId if needed
  if (!userId) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/userId`, { cache: "no-store" });
      const data = await res.json();
      userId = data.userId;
    } catch {
      userId = crypto.randomUUID();
    }
  }

  const userContext = { id: userId };

  // ---------------------------
  // 2️⃣ Fetch Contentful content safely
  // ---------------------------
  let headline = "Welcome";
  let ctaText = "Get Started";

  try {
    const { contentfulClient } = await import("@/lib/contentful");
    const entries = await contentfulClient.getEntries({
      content_type: "landingPage",
      limit: 1,
    });

    if (entries.items.length) {
      const fields = entries.items[0].fields;
      headline = fields.headline ?? headline;
      ctaText = fields.ctaText ?? ctaText;
    }
  } catch (err) {
    console.warn("Contentful fetch failed, using defaults:", err);
  }

  // ---------------------------
  // 3️⃣ Evaluate VWO FME flags safely
  // ---------------------------
  let isNewCTAEnabled = false;
  let showDiscount = false;

  try {
    const flagData = await newCTAExperience.decide({ context: userContext });
    isNewCTAEnabled = flagData?.enabled ?? false;
    ctaText = flagData?.headlineCtaText ?? ctaText;
    showDiscount = flagData?.shouldShowDiscount ?? false;
  } catch (err) {
    console.warn("VWO FME evaluation failed, using defaults:", err);
    isNewCTAEnabled = false;
    showDiscount = false;
  }

  // ---------------------------
  // 4️⃣ Render client component
  // ---------------------------
  return (
    <HomeClient
      userContext={userContext}
      headline={headline}
      isNewCTAEnabled={isNewCTAEnabled}
      ctaText={ctaText}
      showDiscount={showDiscount}
    />
  );
}