import { getVwoClient } from "@/lib/vwoFME";

export async function GET() {
  const vwo = await getVwoClient();
  const flag = await vwo.getFlag("newHomepage", { id: "user123" });

  return Response.json({ isEnabled: flag.isEnabled(), variable: flag.getVariable("variantText", "Default") });
}
