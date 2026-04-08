"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import VWOClientProvider from "../../lib/VWOClientProvider/index";

export default function VWOClientWrapper({
  children,
  accountId,
  sdkKey,
}) {
  const [vwoUserId, setVwoUserId] = useState(null);

  useEffect(() => {
    try {
      let stored = localStorage.getItem("vwo_user_id");

      if (!stored) {
        stored = uuidv4();
        localStorage.setItem("vwo_user_id", stored);
      }

      setVwoUserId(stored);
    } catch {
      setVwoUserId(uuidv4());
    }
  }, []);

  const userContext = useMemo(() => {
    if (!vwoUserId) return null;
    return { id: vwoUserId };
  }, [vwoUserId]);

  if (!userContext) return null;

  if (!accountId || !sdkKey) {
    console.warn("VWO not initialized: missing accountId or sdkKey");
    return children;
  }

  return (
    <VWOClientProvider
      accountId={accountId}
      sdkKey={sdkKey}
      userContext={userContext}
    >
      {children}
    </VWOClientProvider>
  );
}