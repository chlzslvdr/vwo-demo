import { init } from "vwo-fme-node-sdk";

let client = null;
export async function getVwoClient() {
  if (client) return client;

  client = await init({
    accountId: process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID
  });

  return client;
}
