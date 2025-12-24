import { VWOScript } from "vwo-smartcode-nextjs";

export const metadata = {
  title: "VWO Demo",
  description: "Experimenting with VWO on Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <VWOScript accountId={process.env.VWO_ACCOUNT_ID} />
      </head>
      <body>{children}</body>
    </html>
  );
}
