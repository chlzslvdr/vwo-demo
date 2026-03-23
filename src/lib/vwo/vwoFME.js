import { init } from "vwo-fme-node-sdk";

let vwoClient;

export async function getVwoClient() {
  if (vwoClient) return vwoClient;

  const accountId = process.env.VWO_ACCOUNT_ID;
  const sdkKey = process.env.VWO_SDK_KEY;

  if (!accountId || !sdkKey) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("⚠️ VWO disabled: Missing env variables");
  }
  return null;
}

  try {
    vwoClient = await init({
      accountId,
      sdkKey,
    });

    console.info("✅ VWO SDK initialized successfully");
    return vwoClient;
  } catch (err) {
    console.error("❌ VWO INIT ERROR:", err);
    return null;
  }
}