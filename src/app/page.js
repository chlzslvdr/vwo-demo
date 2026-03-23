import HomeClient from "./HomeClient";
import { getVwoClient } from "@/lib/vwo/vwoFME";
import { getFeatureFlags } from "@/lib/vwo/featureFlags";
import { contentfulClient } from "@/lib/contentful/index";
import crypto from "crypto";

export default async function Page() {
  /* -------------------------
     USER ID
  --------------------------*/
  let userId = crypto.randomUUID();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/userId`,
      { cache: "no-store" }
    );
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
  let subHeading =
    "Experience the best of our platform with personalized content just for you.";
  let features = [
    {
      icon: "✅",
      featureTitle: "Easy to Use",
      featureDesc: "A simple interface that gets you working in seconds.",
    },
  ];
  let testimonialQuote = "This product changed my life!";
  let testimonialAuthor = "Alex Johnson";

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "landingPage",
      limit: 1,
    });

    if (entries.items.length) {
      const fields = entries.items[0].fields;

      headline = fields.headline ?? headline;
      ctaText = fields.ctaText ?? ctaText;
      subHeading = fields.subHeading ?? subHeading;
      features = fields.features ?? features;
      testimonialQuote = fields.testimonialQuote ?? testimonialQuote;
      testimonialAuthor = fields.testimonialAuthor ?? testimonialAuthor;
    }
  } catch (err) {
    console.warn("Contentful fetch failed", err);
  }

  /* -------------------------
     VWO FEATURE FLAGS
  --------------------------*/
  let isNewCTAEnabled = false;
  let showDiscount = false;

  try {
    const vwo = await getVwoClient();

    if (vwo) {
      const flags = await getFeatureFlags(vwo, userContext);

      const newCTA = flags.newCtaExperience || {};

      isNewCTAEnabled = newCTA.enabled ?? false;

      if (isNewCTAEnabled) {
        headline = newCTA.variables?.headlineText ?? headline;
        ctaText = newCTA.variables?.headlineCtaText ?? ctaText;
        showDiscount = newCTA.variables?.shouldShowDiscount ?? false;
      }
    }
  } catch (err) {
    console.warn("VWO flag error", err);
  }

  /* -------------------------
     RENDER
  --------------------------*/
  return (
    <HomeClient
      userContext={userContext}
      isFlagActive={isNewCTAEnabled}
      headline={headline}
      ctaText={ctaText}
      showDiscount={showDiscount}
      subHeading={subHeading}
      features={features}
      testimonialQuote={testimonialQuote}
      testimonialAuthor={testimonialAuthor}
    />
  );
}