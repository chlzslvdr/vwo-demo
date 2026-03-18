import { init } from "vwo-fme-node-sdk";

let client = null;

export async function getVwoClient() {
  if (client) return client;

  const accountId = process.env.VWO_ACCOUNT_ID;
  const sdkKey = process.env.VWO_SDK_KEY;

  if (!accountId || !sdkKey) {
    throw new Error("Missing VWO_ACCOUNT_ID or VWO_SDK_KEY");
  }

  client = await init({
    accountId: Number(accountId),
    sdkKey,
  });

  return client;
}