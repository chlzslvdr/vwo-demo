import { VWOScript } from "vwo-smartcode-nextjs";

export const metadata = {
  title: "VWO Demo",
  description: "Experimenting with VWO on Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <VWOScript
          accountId={process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID}
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
