"use client";

import { VWOProvider } from "vwo-fme-react-sdk";

export default function VWOClientProvider({
  children,
  accountId,
  sdkKey,
  userContext,
}) {
  return (
    <VWOProvider
      config={{ accountId, sdkKey }}
      userContext={userContext}
      fallbackComponent={<div>Loading VWO...</div>}
    >
      {children}
    </VWOProvider>
  );
}