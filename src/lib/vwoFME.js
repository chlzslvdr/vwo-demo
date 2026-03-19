import { init } from "vwo-fme-node-sdk";

let vwoClient;

export async function getVwoClient() {
  if (vwoClient) return vwoClient;

  try {
    vwoClient = await init({
      sdkKey: process.env.VWO_SDK_KEY,
      accountId: process.env.VWO_ACCOUNT_ID,
    });

    return vwoClient;
  } catch (err) {
    console.error("VWO INIT ERROR:", err);
    return null;
  }
}