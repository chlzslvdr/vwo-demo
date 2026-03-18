import { flag } from "flags/next";
import { getVwoClient } from "@/lib/vwoFME";

export const newCTAExperience = flag({
  key: "newCtaExperience",
  async decide({ context }) {
    try {
      const vwo = await getVwoClient();
      const vwoFlag = await vwo.getFlag("newCtaExperience", context);

      return {
        enabled: vwoFlag?.isFeatureEnabled() ?? false,
        headlineCtaText: vwoFlag?.getVariable("headlineCtaText", "Launch My Trial"),
        shouldShowDiscount: vwoFlag?.getVariable("shouldShowDiscount", false),
      };
    } catch (err) {
      console.error("VWO FME error:", err);
      return {
        enabled: false,
        headlineCtaText: "Launch My Trial",
        shouldShowDiscount: false,
      };
    }
  },
});