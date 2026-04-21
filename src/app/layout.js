import { VWOScript } from "vwo-smartcode-nextjs";
import VWOClientWrapper from "../components/VWOClientWrapper/index";

export default function RootLayout({ children }) {
  const accountId = process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID;
  const sdkKey = process.env.NEXT_PUBLIC_VWO_SDK_KEY;
  const hasVWOConfig = accountId && sdkKey;

  return (
    <html lang="en">
      <head>
        {hasVWOConfig && (
          <VWOScript
            accountId={accountId}
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
        {hasVWOConfig ? (
          <VWOClientWrapper accountId={accountId} sdkKey={sdkKey}>
            {children}
          </VWOClientWrapper>
        ) : (
          children
        )}
      </body>
    </html>
  );
}