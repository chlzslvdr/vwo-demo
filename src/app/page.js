import HomeClient from "./HomeClient";
import { getVwoClient } from "@/lib/vwoFME";
import { cookies } from "next/headers";
import crypto from "crypto";

export default async function Page() {
  const cookieStore = await cookies();
  let userId = cookieStore.get("vwo_user_id")?.value;

  // If cookie is missing, fetch it from Route Handler
  if (!userId) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/userId`,
        { cache: "no-store" }
      );
      const data = await res.json();
      userId = data?.userId;
    } catch (err) {
      console.warn("Failed to get user ID from API");
    }
  }

  if (!userId || typeof userId !== "string") {
    console.warn("VWO userId missing or invalid, generating fallback");
    userId = crypto.randomUUID();
  }

  const userContext = {
    userId: String(userId),
  };

  let isNewCTAEnabled = false;
  let ctaText = "Get Started";
  let showDiscount = false;

  // ---------------- DEV MODE ----------------
  if (process.env.NODE_ENV === "development") {
    const flag = {
      isEnabled: () => true,
      getVariable: (key, defaultValue) => {
        if (key === "cta_text") return "Get Started Now!";
        if (key === "show_discount") return true;
        return defaultValue;
      },
    };

    isNewCTAEnabled = flag.isEnabled();
    ctaText = flag.getVariable("cta_text", ctaText);
    showDiscount = flag.getVariable("show_discount", showDiscount);
  }

  // ---------------- PROD MODE ----------------
  else {
    try {
      const vwo = await getVwoClient();

      if (!userContext.userId) {
        throw new Error("VWO skipped: invalid userId");
      }

      const flag = vwo.getFlag("new_cta_experience", userContext);

      console.log("VWO FLAG DEBUG:", {
        enabled: flag?.isEnabled?.(),
        variables: flag,
        userId: userContext.userId,
      });

      isNewCTAEnabled = flag?.isEnabled?.() ?? false;
      ctaText = flag?.getVariable?.("cta_text", ctaText) ?? ctaText;
      showDiscount =
        flag?.getVariable?.("show_discount", showDiscount) ?? showDiscount;
    } catch (err) {
      console.warn("VWO flag error, using defaults", err);
    }
  }

  return (
    <HomeClient
      isNewCTAEnabled={isNewCTAEnabled}
      ctaText={ctaText}
      showDiscount={showDiscount}
    />
  );
}
