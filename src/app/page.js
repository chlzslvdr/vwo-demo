import HomeClient from "./HomeClient";
import { getVwoClient } from "@/lib/vwoFME";
import { contentfulClient } from "@/lib/contentful";
import crypto from "crypto";

export default async function Page() {
  /* -------------------------
     USER ID
  --------------------------*/
  let userId = crypto.randomUUID();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userId`, { cache: "no-store" });
    const data = await res.json();
    if (data?.userId) userId = data.userId;
  } catch (err) {
    console.warn("UserID fetch failed", err);
  }

  const userContext = { id: userId };

  /* -------------------------
     FETCH CONTENTFUL
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
      headlineText = fields.headline ?? headline;
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

  try {
    const vwo = await getVwoClient();

    if (vwo) {
      const flag = await vwo.getFlag("newCtaExperience", userContext);

      isNewCTAEnabled = flag?.isEnabled?.() ?? false;

      if (isNewCTAEnabled) {
        headline = flag.getVariable("headlineText") ?? headline;
        ctaText = flag.getVariable("headlineCtaText") ?? ctaText;
        showDiscount = flag.getVariable("shouldShowDiscount") ?? false;
      }

      console.log("VWO DEBUG:", { userId, enabled: isNewCTAEnabled });
    }
  } catch (err) {
    console.warn("VWO flag error", err);
  }

  return (
    <HomeClient
      userContext={userContext}
      headline={headline}
      isFlagActive={isNewCTAEnabled}
      ctaText={ctaText}
      showDiscount={showDiscount}
    />
  );
}