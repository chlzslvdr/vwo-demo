import { VWOScript } from "vwo-smartcode-nextjs";
import { ExperimentsProvider } from "../lib/ExperimentsProvider";

export const metadata = {
  title: "VWO Demo",
  description: "A/B testing with VWO on Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <VWOScript accountId={process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID} />
      </head>
      <body>
        <ExperimentsProvider>{children}</ExperimentsProvider>
      </body>
    </html>
  );
}
