"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { campaigns } from "./campaigns";

const ExperimentsContext = createContext({});

export function ExperimentsProvider({ children }) {
  const [experiments, setExperiments] = useState(
    Object.fromEntries(campaigns.map((c) => [c, null]))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const vwo = window.VWO;
      if (vwo) {
        const resolved = { ...experiments };

        campaigns.forEach((key) => {
          const campaign = vwo.getCampaign(key);
          if (campaign?.variationName) {
            resolved[key] = campaign.variationName;
          }
        });

        if (Object.values(resolved).every((v) => v !== null)) {
          clearInterval(interval);
        }

        setExperiments(resolved);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <ExperimentsContext.Provider value={experiments}>
      {children}
    </ExperimentsContext.Provider>
  );
}

export function useVariation(key) {
  const experiments = useContext(ExperimentsContext);
  return experiments[key];
}

export function useFlag(key) {
  const variation = useVariation(key);
  if (variation === null) return null;
  return variation !== "Control";
}
