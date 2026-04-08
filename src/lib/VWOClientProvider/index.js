"use client";

import { useMemo } from "react";
import { VWOProvider } from "vwo-fme-react-sdk";
import Loading from "../../app/loading";  

export default function VWOClientProvider({
  children,
  accountId,
  sdkKey,
  userContext,
}) {
  const config = useMemo(() => {
    return { accountId, sdkKey };
  }, [accountId, sdkKey]);

  const stableUserContext = useMemo(() => {
    return userContext;
  }, [userContext.id]);

  return (
    <VWOProvider
      config={config}
      userContext={stableUserContext}
      fallbackComponent={<Loading />}
    >
      {children}
    </VWOProvider>
  );
}