import { createClient } from "contentful";

export function getContentfulClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

  if (!space || !accessToken) {
    throw new Error("Missing Contentful environment variables");
  }

  return createClient({
    space,
    accessToken,
  });
}
