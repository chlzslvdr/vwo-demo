import { VWOScript } from "vwo-smartcode-nextjs";

export const metadata = {
  title: "VWO Demo",
  description: "Experimenting with VWO on Next.js App Router",
};

export default function RootLayout({ children }) {
  const accountId = process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID;

  if (!accountId) {
    console.warn("⚠️ NEXT_PUBLIC_VWO_ACCOUNT_ID is not set for client-side VWO script");
  }

  return (
    <html lang="en">
      <head>
        <VWOScript
          accountId={accountId || ""}
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}