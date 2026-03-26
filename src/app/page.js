import HomeClient from "./HomeClient";
import { getContentfulClient } from "@/lib/contentful";
import { cookies } from "next/headers";

export default async function Page() {
  /* -------------------------
     GET USER ID FROM COOKIE
  --------------------------*/
  let userId;

  try {
    const cookieStore = await cookies();
    userId = cookieStore.get?.("vwo_user_id")?.value;
  } catch (err) {
    console.warn("Cookies not available:", err);
  }

  // fallback (first visit before cookie exists)
  if (!userId) {
    userId = crypto.randomUUID();
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
      fields: {
        icon: "✅",
        featureTitle: "Easy to Use",
        featureDesc: "A simple interface that gets you working in seconds.",
      },
    },
  ];
  let testimonialQuote = "This product changed my life!";
  let testimonialAuthor = "Alex Johnson";

  try {
    const client = getContentfulClient();

    const entries = await client.getEntries({
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
    console.warn("Contentful fetch failed:", err);
  }

  /* -------------------------
     RENDER CLIENT COMPONENT
  --------------------------*/
  return (
    <HomeClient
      userContext={userContext}
      headline={headline}
      ctaText={ctaText}
      subHeading={subHeading}
      features={features}
      testimonialQuote={testimonialQuote}
      testimonialAuthor={testimonialAuthor}
    />
  );
}