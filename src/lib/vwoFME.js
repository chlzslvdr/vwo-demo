import { init } from "vwo-fme-node-sdk";

let client = null;

export async function getVwoClient() {
  if (client) return client;

  client = await init({
    accountId: process.env.VWO_ACCOUNT_ID,
    sdkKey: process.env.VWO_SDK_KEY,
  });

  return client;
}
