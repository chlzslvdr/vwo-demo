import HomeClient from "./HomeClient";
import { getVwoClient } from "@/lib/vwoFME";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  let userId = cookieStore.get("vwo_user_id")?.value;

  // If cookie is missing, fetch it from Route Handler
  if (!userId) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/userId`);
      const data = await res.json();
      userId = data.userId;
    } catch (err) {
      console.warn("Failed to get user ID from API, generating locally");
      userId = crypto.randomUUID();
    }
  }

  // const userContext = { id: userId };
  const userContext = { userId: crypto.randomUUID() };

  let isNewCTAEnabled = false;
  let ctaText = "Get Started";
  let showDiscount = false;

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
  } else {
    try {
      const vwo = await getVwoClient();
      const flag = vwo.getFlag("new_cta_experience", userContext);
      console.log("VWO FLAG DEBUG:", flag);

      isNewCTAEnabled = flag?.isEnabled?.() ?? false;
      ctaText = flag?.getVariable?.("cta_text", ctaText) ?? ctaText;
      showDiscount = flag?.getVariable?.("show_discount", showDiscount) ?? showDiscount;
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
