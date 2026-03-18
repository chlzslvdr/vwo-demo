import { flag } from "flags/next";
import { getVwoClient } from "@/lib/vwoFME";

export const newCTAExperience = flag({
  key: "newCtaExperience",
  async decide({ context }) {
    const vwo = await getVwoClient();
    const vwoFlag = await vwo.getFlag("newCtaExperience", context);

    return {
      enabled: vwoFlag.isFeatureEnabled(),
      headlineCtaText: vwoFlag?.getVariable?.(
        "headlineCtaText",
        "Launch My Trial"
      ),
      shouldShowDiscount: vwoFlag?.getVariable("shouldShowDiscount", false),
    };
  },
});
