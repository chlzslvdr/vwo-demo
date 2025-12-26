import HomeClient from "./HomeClient";
import { getVwoClient } from "@/lib/vwoFME";
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

  const userContext = {
    id: String(userId),
  };

  let isNewCTAEnabled = false;
  let ctaText = "Get Started";
  let showDiscount = false;

  if (process.env.NODE_ENV === "development") {
    isNewCTAEnabled = true;
    ctaText = "Get Started Now!";
    showDiscount = true;
  } else {
    try {
      const vwo = await getVwoClient();

      const flag = await vwo.getFlag("new_cta_experience", userContext);

      console.log("VWO FLAG DEBUG:", {
        enabled: flag?.isEnabled?.(),
        userId: userContext.id,
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
