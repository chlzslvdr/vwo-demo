import { VWOScript } from "vwo-smartcode-nextjs";
import VWOClientProvider from "@/lib/vwo-client-provider/index";

export default async function RootLayout({ children }) {
  const accountId = process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID;
  const sdkKey = process.env.NEXT_PUBLIC_VWO_SDK_KEY;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userId`, {
    cache: "no-store",
    credentials: "include",
  });

  const data = await res.json();
  const userContext = { id: data.userId };

  return (
    <html lang="en">
      <head>
        <VWOScript accountId={accountId || ""} strategy="beforeInteractive" />
      </head>
      <body>
        <VWOClientProvider
          accountId={accountId}
          sdkKey={sdkKey}
          userContext={userContext}
        >
          {children}
        </VWOClientProvider>
      </body>
    </html>
  );
}