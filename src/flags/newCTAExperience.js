import { flag } from "flags/next";
import { getVwoClient } from "@/lib/vwoFME";

export const newCTAExperience = flag({
  key: "newCtaExperience",
  async decide({ context }) {
    const vwo = await getVwoClient();
    const vwoFlag = vwo.getFlag("newCtaExperience", context);

    return {
      enabled: vwoFlag.isEnabled(),
      ctaText: vwoFlag.getVariable("headlineCtaText", "Launch My Trial"),
      showDiscount: vwoFlag.getVariable("shouldShowDiscount", false),
    };
  },
});