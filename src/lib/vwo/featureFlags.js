export async function getFeatureFlags(vwo, userContext) {
  const flagConfigs = {
    newCtaExperience: ["headlineText", "headlineCtaText", "shouldShowDiscount"],
  };

  const result = {};

  // 🚫 If VWO is not initialized → all flags OFF
  if (!vwo) {
    Object.keys(flagConfigs).forEach((key) => {
      result[key] = {
        enabled: false,
        variables: {},
      };
    });
    return result;
  }

  await Promise.all(
    Object.entries(flagConfigs).map(async ([key, variables]) => {
      try {
        const flag = await vwo.getFlag(key, userContext);

        const enabled = flag?.isEnabled?.() ?? false;

        result[key] = {
          enabled,
          variables: {},
        };

        if (enabled && flag) {
          variables.forEach((v) => {
            result[key].variables[v] = flag.getVariable(v);
          });
        }
      } catch (err) {
        console.warn(`Flag error: ${key}`, err);

        result[key] = {
          enabled: false,
          variables: {},
        };
      }
    })
  );

  return result;
}