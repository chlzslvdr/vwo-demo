import { init } from "vwo-fme-node-sdk";

let client = null;

export async function getVwoClient() {
  if (client) return client;

  const sdkKey = process.env.VWO_SDK_KEY;

  if (!sdkKey) {
    throw new Error("Missing VWO_SDK_KEY");
  }

  client = await init({ sdkKey });

  return client;
}