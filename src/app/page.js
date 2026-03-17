import HomeClient from "./HomeClient";
import { getVwoClient } from "@/lib/vwoFME";
import { contentfulClient } from "@/lib/contentful";
import { cookies } from "next/headers";
import crypto from "crypto";

export default async function Page() {
  const cookieStore = await cookies();
  let userId = cookieStore.get("vwo_user_id")?.value;

  if (!userId) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/userId`,
        { cache: "no-store" }
      );
      const data = await res.json();
      userId = data?.userId;
    } catch {
      userId = crypto.randomUUID();
    }
  }

  const userContext = { id: userId.toString() };

  /* -------------------------
     FETCH CONTENTFUL CONTENT
  --------------------------*/

  let headline = "Welcome";
  let ctaText = "Get Started";

  try {
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
    console.warn("Contentful fetch failed", err);
  }

  /* -------------------------
     VWO FEATURE FLAG
  --------------------------*/

  let isNewCTAEnabled = false;
  let showDiscount = false;

  if (process.env.NODE_ENV === "development") {
    isNewCTAEnabled = true;
    ctaText = "Launch Now";
    showDiscount = true;
  } else {
    try {
      const vwo = await getVwoClient();

      const flag = await vwo.getFlag("newCtaExperience", userContext);

      console.info("🧪 VWO FLAG RAW:", flag);

      if (!flag) {
        console.error("❌ Flag not found in VWO: newCtaExperience");
      }

      console.info("🧪 VWO FLAG DEBUG:", {
        enabled: flag?.isFeatureEnabled?.(),
        userId: userContext.id,
        ctaText: flag?.getVariable?.("headlineCtaText"),
        showDiscount: flag?.getVariable?.("shouldShowDiscount"),
      });

      isNewCTAEnabled = flag?.isFeatureEnabled?.() ?? false;

      ctaText =
        flag?.getVariable?.("headlineCtaText", ctaText) ?? ctaText;

      showDiscount =
        flag?.getVariable?.("shouldShowDiscount", showDiscount) ??
        showDiscount;
    } catch (err) {
      console.warn("VWO flag error, using defaults", err);
    }
  }

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