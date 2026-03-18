import HomeClient from "./HomeClient";
import { newCTAExperience } from "@/flags/newCTAExperience";
import { cookies } from "next/headers";
import crypto from "crypto";

export default async function Page() {
  // ---------------------------
  // 1. Get or generate a stable user ID
  // ---------------------------
  const cookieStore = cookies();
  let userId = cookieStore.get("vwo_user_id")?.value;

  if (!userId) {
    try {
      // Use your API route to generate and set the cookie
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/userId`,
        { cache: "no-store" }
      );
      const data = await res.json();
      userId = data.userId;
    } catch (err) {
      console.warn("Failed to fetch userId API, generating fallback:", err);
      // fallback to temporary UUID if API fails
      userId = crypto.randomUUID();
    }
  }

  const userContext = { id: userId };

  // ---------------------------
  // 2. Fetch Contentful content
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
    console.warn("Contentful fetch failed:", err);
  }

  // ---------------------------
  // 3. Evaluate VWO feature flag
  // ---------------------------
  let isNewCTAEnabled = false;
  let showDiscount = false;

  try {
    const flagData = await newCTAExperience.evaluate({ context: userContext });

    isNewCTAEnabled = flagData.enabled ?? false;
    ctaText = flagData.headlineCtaText ?? ctaText;
    showDiscount = flagData.shouldShowDiscount ?? showDiscount;
  } catch (err) {
    console.warn("VWO flag evaluation failed, using defaults:", err);
  }

  // ---------------------------
  // 4. Render client component
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