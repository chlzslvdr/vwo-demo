import { flag } from "flags/next";
import { getVwoClient } from "@/lib/vwoFME";

export const newCTAExperience = flag({
  key: "newCtaExperience",
  async decide({ context }) {
    try {
      const vwo = await getVwoClient();

      // vwo might fail if keys are invalid
      const vwoFlag = await vwo.getFlag("newCtaExperience", context);

      return {
        enabled: vwoFlag?.isFeatureEnabled?.() ?? false,
        headlineCtaText: vwoFlag?.getVariable?.("headlineCtaText", "Launch My Trial"),
        shouldShowDiscount: vwoFlag?.getVariable?.("shouldShowDiscount", false),
      };
    } catch (err) {
      console.warn(
        "VWO FME fetch failed, using default flag values (likely local/dev):",
        err.message || err
      );

      return {
        enabled: false,
        headlineCtaText: "Launch My Trial",
        shouldShowDiscount: false,
      };
    }
  },
});