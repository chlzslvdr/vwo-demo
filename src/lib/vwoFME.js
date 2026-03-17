import { init } from "vwo-fme-node-sdk";

let client = null;

export async function getVwoClient() {
  if (client) return client;

  const accountId = String(process.env.VWO_ACCOUNT_ID);
  const sdkKey = process.env.VWO_SDK_KEY;

  if (!sdkKey || !accountId) {
    throw new Error("Missing VWO_ACCOUNT_ID or VWO_SDK_KEY");
  }

  client = await init({ accountId, sdkKey });
  return client;
}